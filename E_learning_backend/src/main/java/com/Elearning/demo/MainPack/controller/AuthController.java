package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import com.Elearning.demo.MainPack.Services.EmailService;
import com.Elearning.demo.MainPack.Services.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.bind.annotation.*;

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


}
