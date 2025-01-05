package com.Elearning.demo.MainPack.Model;


public class UserEnrollmentDTO {
    private String userId;
    private String username;
    private int enrollmentCount;

    public UserEnrollmentDTO(String userId, String username, int enrollmentCount) {
        this.userId = userId;
        this.username = username;
        this.enrollmentCount = enrollmentCount;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getEnrollmentCount() {
        return enrollmentCount;
    }

    public void setEnrollmentCount(int enrollmentCount) {
        this.enrollmentCount = enrollmentCount;
    }

}