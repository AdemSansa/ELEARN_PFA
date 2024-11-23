package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import com.Elearning.demo.MainPack.Services.EmailService;
import com.Elearning.demo.MainPack.Services.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private Authservice authservice;

    @Autowired
    UserRepository userRepository;


    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private RestTemplate restTemplate;


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String token = passwordResetService.generateResetToken(email);
        emailService.sendPasswordResetEmail(email, token);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Password reset link sent to your email.");
        }});                }


    @PostMapping("/register")
    public ResponseEntity <?>  register(@RequestBody User user) {

        try {
            User registeredUser = authservice.registerUser(user.getName(), user.getEmail(), user.getPassword());
            return ResponseEntity.ok(registeredUser);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = authservice.loginUser(user.getEmail(), user.getPassword(), user.getRoles());
            Map<String, Object> response = new HashMap<>();
            response.put("id", loggedInUser.getId());
            response.put("email", loggedInUser.getEmail());
            response.put("role", loggedInUser.getRoles());
            response.put("message", "Login successful");


            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");

        // Verify the Google token with Google's OAuth2 API
        String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> userInfo = response.getBody();
            String googleId = (String) userInfo.get("sub");
            String email = (String) userInfo.get("email");
            String name = (String) userInfo.get("name");
            String pictureUrl = (String) userInfo.get("picture");
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setPassword("");
                user.setResetToken(null);
                user.setTokenExpiration(null);
                user.setBlocked(false);
                user.setFailedAttempts(0);
                userRepository.save(user);
            }
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(400).body("Invalid Google Token");
        }
    }


    @GetMapping("/isLoggedIn")
    public ResponseEntity<Boolean> isLoggedIn(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        String token = authHeader.substring(7);
        boolean isValid = authservice.validateToken(token);
        return ResponseEntity.ok(isValid);
    }

}