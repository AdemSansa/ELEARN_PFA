package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Components.JwtUtil;
import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Config.SecurityConfig;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import com.Elearning.demo.MainPack.Services.EmailService;
import com.Elearning.demo.MainPack.Services.PasswordResetService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private Authservice authservice;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private RestTemplate restTemplate;
    private List<String> teacherKeys = new ArrayList<>();

    public AuthController() {
        teacherKeys.add("aabbccdd");
        teacherKeys.add("123456789");
        teacherKeys.add("00000000");
        teacherKeys.add("190603");
        teacherKeys.add("23462378");
        teacherKeys.add("20242025");
    }


    @PostMapping("/teacher-register")
    public ResponseEntity<?> registerTeacher(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String name = requestBody.get("name");
        String password = requestBody.get("password");
        String secretKey = requestBody.get("secretKey");
        if (teacherKeys.contains(secretKey)) {
            teacherKeys.remove(secretKey);
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(SecurityConfig.passwordEncoder().encode(password));
            user.setRoles(List.of("ROLE_TEACHER"));
            user.setActiveRole("ROLE_TEACHER");
            user.setBlocked(false);
            user.setFailedAttempts(0);
            userRepository.save(user);
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "Teacher registration successful");
            }});
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid secret key.");
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String token = passwordResetService.generateResetToken(email);
        emailService.sendPasswordResetEmail(email, token);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Password reset link sent to your email.");
        }});                }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        String newPassword = requestBody.get("newPassword");
        System.out.println(newPassword);
        System.out.println(token);
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Password reset successful.");
        }});
    }


    @PostMapping("/register")
    public ResponseEntity <?>  register(@RequestBody User user) {

        try {
            User registeredUser = authservice.registerUser(user);
            return ResponseEntity.ok(registeredUser);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            String loggedInUser = authservice.loginUser(user.getEmail(), user.getPassword(), user.getRoles());
            Map<String, Object> response = new HashMap<>();

            String token = loggedInUser;
            response.put("token", token);
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
                user.setAvatarURL(pictureUrl);

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
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid Authorization header.");
        }

        String token = authHeader.substring(7);

        // Add token to a blacklist (e.g., in a database or cache)
        jwtUtil.addToBlacklist(token);

        return  ResponseEntity.ok(Collections.singletonMap("message", "Logout successful"));
    }
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String token = authHeader.substring(7); // Extract token
        System.out.println("this token is h  : "+token);
        //Extract User from token
        String id = jwtUtil.extractUserId(token);
        System.out.println(id);


        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            // Customize the response as per your requirements
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.get().getId());
            userInfo.put("activeROle",user.get().getActiveRole());
            userInfo.put("email", user.get().getEmail());
            userInfo.put("name", user.get().getName());
            userInfo.put("role", user.get().getRoles());
            userInfo.put("address", user.get().getAdress());
            userInfo.put("city", user.get().getCity());
            userInfo.put("country", user.get().getCountry());
            userInfo.put("birthDate", user.get().getBirthDate());
            userInfo.put("phoneNumber", user.get().getPhoneNumber());
            userInfo.put("facebookURL", user.get().getFacebookURL());
            userInfo.put("githubURL", user.get().getGithubURL());
            userInfo.put("linkedinURL", user.get().getLinkedinURL());
            userInfo.put("AvatarURL", user.get().getAvatarURL());

            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

    }
    @PostMapping("/Complete_Profile")
    public ResponseEntity<?> completeProfile(@RequestBody User user) {
        try {
            User updatedUser = authservice.CompleteProfile(user);
            System.out.println(updatedUser);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("ChoosePreferences")
    public ResponseEntity<?> choosePreferences(@RequestBody Map<String, List<String>> request) {
        String userId = request.get("userId").get(0);
        List<String> preferences = request.get("preferences");

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setPreferences(preferences);
        userRepository.save(user);

        return ResponseEntity.ok("Preferences updated successfully");
    }

    @PatchMapping("/{id}/avatar")
    public ResponseEntity<?> updateAvatar(@PathVariable String id, @RequestBody Map<String, String> request) {
        String avatarUrl = request.get("avatarUrl");
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setAvatarURL(avatarUrl);
        ; // Mark the user as no longer on their first login
        userRepository.save(user);

        return ResponseEntity.ok("Avatar updated successfully");
    }


}