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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

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
    public String forgotPassword(@RequestParam String email) {
        String token = passwordResetService.generateResetToken(email);
        emailService.sendPasswordResetEmail(email, token);
        return "Password reset link sent to email.";
    }
    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        passwordResetService.resetPassword(token, newPassword);
        return "Password has been reset successfully.";
    }

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



            User loggedInUser = authservice.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
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
    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String clientSecret;
    @PostMapping("/github")
    public ResponseEntity<?> githubLogin(@RequestParam String code) {
        String accessTokenUrl = "https://github.com/login/oauth/access_token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(accessTokenUrl, request, Map.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            String accessToken = response.getBody().get("access_token").toString();

            String userInfoUrl = "https://api.github.com/user";
            HttpHeaders userInfoHeaders = new HttpHeaders();
            userInfoHeaders.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);

            if (userInfoResponse.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> userInfo = userInfoResponse.getBody();
                String githubId = (String) userInfo.get("id");
                String email = (String) userInfo.get("email");
                String name = (String) userInfo.get("name");

                User user = userRepository.findByEmail(email).orElse(null);
                if (user == null) {
                    user = new User();
                    user.setName(name);
                    user.setEmail(email);
                    user.setPassword("");
                    userRepository.save(user);
                }

                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to fetch user info from GitHub");
            }
        } else {
            return ResponseEntity.status(response.getStatusCode()).body("GitHub login failed");
        }
    }

}