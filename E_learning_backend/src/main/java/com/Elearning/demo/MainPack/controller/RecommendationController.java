package com.Elearning.demo.MainPack.controller;

import com.Elearning.demo.MainPack.Config.RecommendationService;
import com.Elearning.demo.MainPack.Model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/courses/{userId}")
    public ResponseEntity<List<Course>> getRecommendedCourses(@PathVariable String userId) {
        List<Course> recommendedCourses = recommendationService.getRecommendedCourses(userId);
        if (recommendedCourses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(recommendedCourses);
    }
}
