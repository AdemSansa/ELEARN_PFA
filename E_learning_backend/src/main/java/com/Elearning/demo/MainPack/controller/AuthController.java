package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private Authservice authservice;
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
