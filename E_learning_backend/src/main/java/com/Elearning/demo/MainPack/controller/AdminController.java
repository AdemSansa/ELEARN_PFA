package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.CourseService;
import com.Elearning.demo.MainPack.Config.EnrollmentService;
import com.Elearning.demo.MainPack.Config.UserService;
import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Model.UserEnrollmentDTO;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/Admin")
public class AdminController {

    private final UserService userService;
    private final EnrollmentService enrollmentService;
    private final CourseService courseService;
    private final UserRepository userRepository;

    public AdminController(UserService userService, EnrollmentService enrollmentService , CourseService courseService, UserRepository userRepository) {
        this.userService = userService;
        this.enrollmentService = enrollmentService;
        this.courseService = courseService;
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    //GetUserby id
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/ban/{id}")
    public ResponseEntity<User> banUser(@PathVariable String id) {
        userService.banUser(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
    //Edit User
    @PutMapping("/edit/{id}")
    public ResponseEntity<User> editUser(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(userService.editUser(id, user));
    }
    @PutMapping("/users/{id}/roles")
    public ResponseEntity<User> updateUserRoles(@PathVariable String id, @RequestBody List<String> roles) {
        User user = userService.updateRoles(id, roles);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Map<String, Object>>> getCoursesWithEnrollmentCounts() {
        List<Map<String, Object>> coursesWithEnrollments = courseService.getCoursesWithEnrollmentCounts();
        return ResponseEntity.ok(coursesWithEnrollments);
    }

    //Top users enrolled
    @GetMapping("/topUsers")

    public ResponseEntity<List<UserEnrollmentDTO>> getTopUsers() {
        List<UserEnrollmentDTO> users = userService.getUsersWithMostEnrollments();
        users= users.stream().limit(10).toList();

        return ResponseEntity.ok(users);
    }
}