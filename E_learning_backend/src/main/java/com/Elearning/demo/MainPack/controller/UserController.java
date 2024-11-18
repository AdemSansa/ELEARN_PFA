package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Config.UserService;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/User")

public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            System.out.println("Get all users...");
            List<User> users = userRepository.findAll();
            System.out.println("Users: " + users.size());
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    @PostMapping("/editUser")
    public ResponseEntity<?> editUser(@RequestBody User user) {
        try {
            User editedUser = userService.editUser(user);
            return ResponseEntity.ok(editedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        try {
            userService.deleteUser(user);
            return ResponseEntity.ok("User deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
