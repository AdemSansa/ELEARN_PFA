package com.Elearning.demo.MainPack.Model;


import java.util.List;

public class Question {
    private String content; // The question text
    private List<String> options; // List of options
    private int correctOption; // Index of the correct option

    // Getters and Setters

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(int correctOption) {
        this.correctOption = correctOption;
    }
}