package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.RecommendationService;
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

    @GetMapping("/courses/{userId}")
    public ResponseEntity<List<Course>> getRecommendedCourses(@PathVariable String userId) {
        List<Course> recommendedCourses = recommendationService.getRecommendedCourses(userId);
        System.out.println(recommendedCourses);
        if (recommendedCourses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(recommendedCourses);
    }



    @PostMapping("/recommendations")
    public List<Course> getRecommendations(@RequestBody User user) {
        // Use recommendation service to get recommended courses for the user
        List<Course> recommendedCourses = recommendationService.getRecommendedCourses(user);
        return recommendedCourses;
    }
}
