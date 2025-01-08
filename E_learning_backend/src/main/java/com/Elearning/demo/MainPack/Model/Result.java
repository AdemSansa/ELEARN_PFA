package com.Elearning.demo.MainPack.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "results") // MongoDB collection name
public class Result {

    @Id
    private String id; // Unique ID
    private String userId; // ID of the user who completed the quiz
    private String quizId; // ID of the quiz
    private String QuizTitle; // Title of the quiz
    private int score; // Score obtained
    private int totalScore; // Total possible score
    private boolean passed; // Pass or fail status
    private Date date; // Date of completion


    // Getters and Setters


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public String getQuizTitle() {
        return QuizTitle;
    }
    public void setQuizTitle(String quizTitle) {
        QuizTitle = quizTitle;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }
}
