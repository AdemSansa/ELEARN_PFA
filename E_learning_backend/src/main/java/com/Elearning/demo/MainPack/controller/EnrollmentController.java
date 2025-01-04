package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.EnrollmentService;
import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import javax.swing.text.html.HTML;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;
    private CourseRepository courseRepository;

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollUserInCourse(@RequestParam String userId, @RequestParam String courseId) {
        try{
        Enrollment enrollment = enrollmentService.enrollUserInCourse(userId, courseId);
            return new ResponseEntity<>(enrollment, HttpStatus.CREATED);}
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getEnrollmentsByUser(@PathVariable String userId) {
        User user = new User(); // Load the user by userId
        user.setId(userId);  // Set the userId for now, you can load the user from a DB or Auth context
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByUser(user));
    }
    @GetMapping("/course/{courseId}")
    public List<Enrollment> getEnrollmentsByCourse(@PathVariable String courseId) {
        Course course = new Course(); // Load the course by courseId
        course.setId(courseId); // Set courseId for now, you can load it from a DB
        return enrollmentService.getEnrollmentsByCourse(course);
    }
    @GetMapping("/courseid/{userId}")
    public ResponseEntity<?> getUserCoursesIDS(@PathVariable String userId) {
        User user = new User(); // Load the user by userId
        user.setId(userId);  // Set the userId for now, you can load the user from a DB or Auth context
        return ResponseEntity.ok(enrollmentService.getCoursesIdsByUser(user));
    }

    @GetMapping("/enrolledUsers/{courseId}")
    public ResponseEntity<?> getEnrolledUsers(@PathVariable String courseId) {
        List<User> enrolledUsers = enrollmentService.getEnrolledUsersByCourse(courseId);
        return ResponseEntity.ok(enrolledUsers);
    }
    @PostMapping("/{courseId}/lessons/{lessonId}/complete")
    public ResponseEntity<Void> completeLesson(@PathVariable String courseId, @PathVariable String lessonId, Authentication authentication) {
        String userId = authentication.getName(); // Get the logged-in user's ID
        enrollmentService.completeLesson(userId, courseId, lessonId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{courseId}/progress")
    public ResponseEntity<Integer> getProgress(
            @PathVariable String courseId,
            @RequestParam String userId
    ) {
        int progress = enrollmentService.calculateProgress(userId, courseId);
        return ResponseEntity.ok(progress);
    }
    @GetMapping("/{courseId}/completedLessons")
    public ResponseEntity<List<String>> getCompletedLessons(@RequestParam String userId, @PathVariable String courseId) {
        List<String> completedLessons = enrollmentService.getCompletedLessons(userId, courseId);
        return ResponseEntity.ok(completedLessons);
    }
}
