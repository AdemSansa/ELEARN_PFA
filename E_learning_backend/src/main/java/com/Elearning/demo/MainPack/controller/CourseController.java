package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Config.CourseService;
import com.Elearning.demo.MainPack.Config.UserService;
import com.Elearning.demo.MainPack.Config.CategoryService;
import com.Elearning.demo.MainPack.Config.CourseService;
import com.Elearning.demo.MainPack.Model.Category;
import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;
    // Create a new course
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course, @RequestParam String categoryId) {
        Course newCourse = courseService.createCourse(course, categoryId);
        List<String> emails = userService.getAllEmails();
        for (String email : emails) {
            emailService.sendEmail(email, newCourse.getAuthor(), newCourse.getTitle());
        }
        return ResponseEntity.ok(newCourse);
    }
    // Get all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Course>> getCoursesByCategory(@PathVariable String categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        System.out.println(category);
        List<Course> courses = courseService.getCoursesByCategory(category);
        return ResponseEntity.ok(courses);
    }

    // Get a course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        return ResponseEntity.ok(updatedCourse);
    }
    // Delete a course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    // Get courses by author
    @GetMapping("/author/{author}")
    public ResponseEntity<List<Course>> getCoursesByAuthor(@PathVariable String author) {
        List<Course> courses = courseService.getCoursesByAuthor(author);
        return ResponseEntity.ok(courses);
    }


}