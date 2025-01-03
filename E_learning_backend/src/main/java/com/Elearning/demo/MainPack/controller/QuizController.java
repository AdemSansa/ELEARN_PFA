package com.Elearning.demo.MainPack.controller;



import com.Elearning.demo.MainPack.Config.QuizService;
import com.Elearning.demo.MainPack.Config.ResultService;
import com.Elearning.demo.MainPack.Model.Quiz;
import com.Elearning.demo.MainPack.Model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;


    @Autowired
    private ResultService resultService;




    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }
    // Get quizzes by subject ID
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Quiz>> getQuizzesBySubject(@PathVariable String subjectId) {
        List<Quiz> quizzes = quizService.getQuizzesBySubject(subjectId);
        return ResponseEntity.ok(quizzes);
    }

    // Get a specific quiz by ID
    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable String quizId) {
        Quiz quiz = quizService.getQuizById(quizId);
        return ResponseEntity.ok(quiz);
    }

    // Add a new quiz
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz savedQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    // Delete a quiz by ID
    @DeleteMapping("/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable String quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{quizId}/submit")
    public ResponseEntity<?> submitQuiz(
            @PathVariable String quizId,
            @RequestParam String userId,
            @RequestParam long startTime,
            @RequestBody List<Integer> submittedAnswers) {

        Quiz quiz = quizService.getQuizById(quizId);

        // Validate timer
        long currentTime = System.currentTimeMillis();
        long durationMillis = quiz.getDuration() * 60 * 1000;

        if ((currentTime - startTime) > durationMillis) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quiz time expired!");
        }

        // Calculate score
        int score = 0;
        int totalScore = quiz.getQuestions().size();

        for (int i = 0; i < totalScore; i++) {
            if (quiz.getQuestions().get(i).getCorrectOption() == submittedAnswers.get(i)) {
                score++;
            }
        }

        // Save result
        Result result = new Result();
        result.setQuizId(quizId);
        result.setUserId(userId);
        result.setScore(score);
        result.setDate(new Date());
        result.setQuizTitle(quiz.getTitle());
        result.setTotalScore(totalScore);
        result.setPassed(score >= totalScore * 0.6);

        Result savedResult = resultService.saveResult(result);
        return ResponseEntity.ok(savedResult);
    }
    // Return Quizzes bu User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Quiz>> getQuizzesByUser(@PathVariable String userId) {
        List<Quiz> quizzes = quizService.findQuizByUserId(userId);
        return ResponseEntity.ok(quizzes);
    }

    //Update Quiz
    @PutMapping("/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable String quizId, @RequestBody Quiz quiz) {
        Quiz updatedQuiz = quizService.updateQuiz(quizId, quiz);
        return ResponseEntity.ok(updatedQuiz);
    }



}