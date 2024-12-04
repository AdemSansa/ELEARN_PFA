package com.Elearning.demo.MainPack.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String resetToken;
    private LocalDateTime tokenExpiryDate;
    private int  failedAttempts;
    private boolean isBlocked;
    private List <String> _ROLE = new ArrayList<>();


    public List<String> getRoles() {
        return _ROLE;
    }

    public void setRoles(List<String> roles) {
        this._ROLE = roles;
    }
    public void set_ROLE(String role) {
        this._ROLE.add(role);
    }

    public int getFailedAttempts() {
        return failedAttempts;
    }

    public void setFailedAttempts(int failedAttempts) {
        this.failedAttempts = failedAttempts;
    }

    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean isBlocked) {
        this.isBlocked = isBlocked;
    }
    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }
    public LocalDateTime getTokenExpiration() {
        return tokenExpiryDate;
    }

    public void setTokenExpiration(LocalDateTime tokenExpiration) {
        this.tokenExpiryDate = tokenExpiration;
    }

    public User() {

    }
    public User(@JsonProperty("name") String name, @JsonProperty("email") String email, @JsonProperty("password") String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
