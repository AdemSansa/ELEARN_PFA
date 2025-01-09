package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.Authservice;
import com.Elearning.demo.MainPack.Config.RecommendationService;
import com.Elearning.demo.MainPack.Config.UserService;
import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;
    @Autowired
    private Authservice authservice;
    @Autowired
    private UserService userService;


    @GetMapping("/recommendations/{userId}")
    public List<Course> getRecommendations(@PathVariable String userId) {
        User user = userService.getUserById(userId);

        // Use recommendation service to get recommended courses for the user
        List<Course> recommendedCourses = recommendationService.getRecommendedCourses(user);
        return recommendedCourses;
    }
}
