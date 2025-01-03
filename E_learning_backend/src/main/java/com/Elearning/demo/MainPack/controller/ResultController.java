package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.ResultService;
import com.Elearning.demo.MainPack.Model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    // Save a result
    @PostMapping
    public ResponseEntity<Result> saveResult(@RequestBody Result result) {
        Result savedResult = resultService.saveResult(result);
        return ResponseEntity.ok(savedResult);
    }

    // Get results by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Result>> getResultsByUser(@PathVariable String userId) {
        List<Result> results = resultService.getResultsByUser(userId);
        return ResponseEntity.ok(results);
    }

    // Get results by quiz ID
    @GetMapping("/timesPlayed/{quizId}")
    public ResponseEntity<List<Result>> getResultsByQuiz(@PathVariable String quizId) {
        List<Result> results = resultService.getResultsByQuiz(quizId);
        return ResponseEntity.ok(results);
    }
}