package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.UserService;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Admin")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getAllUsers")
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
    @DeleteMapping("/deleteUser/{ID}")
    public ResponseEntity<?> deleteUser(@PathVariable String ID) {
        try {
            Optional<User> user  = userRepository.getUsersById(ID);
            userService.deleteUser(user.orElse(null));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/getUserById/{id}")    //get user by id
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }






}
