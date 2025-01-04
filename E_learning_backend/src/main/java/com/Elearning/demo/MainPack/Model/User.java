






package com.Elearning.demo.MainPack.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private boolean active;
    //Added Fields For profile
    private int PhoneNumber;
    private String Adress;
    private String City;
    private String Country;
    private Date BirthDate;
    private String FacebookURL;
    private String GithubURL;
    private String LinkedinURL;
    private String TwitterURL;
    private String InstagramURL;

    private String avatarURL;

    //Active Role
    private String activeRole;

    public String getActiveRole() {
        return activeRole;
    }

    public void setActiveRole(String activeRole) {
        this.activeRole = activeRole;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    private List <String> _ROLE = new ArrayList<>();

    private String resetToken;
    private LocalDateTime tokenExpiryDate;
    private int  failedAttempts;
    private boolean isBlocked;

    public int getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        PhoneNumber = phoneNumber;
    }

    public String getAdress() {
        return Adress;
    }

    public void setAdress(String adress) {
        Adress = adress;
    }

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }

    public String getCountry() {
        return Country;
    }

    public void setCountry(String country) {
        Country = country;
    }

    public Date getBirthDate() {
        return BirthDate;
    }

    public void setBirthDate(Date birthDate) {
        BirthDate = birthDate;
    }

    public String getFacebookURL() {
        return FacebookURL;
    }

    public void setFacebookURL(String facebookURL) {
        FacebookURL = facebookURL;
    }

    public String getGithubURL() {
        return GithubURL;
    }

    public void setGithubURL(String githubURL) {
        GithubURL = githubURL;
    }

    public String getLinkedinURL() {
        return LinkedinURL;
    }

    public void setLinkedinURL(String linkedinURL) {
        LinkedinURL = linkedinURL;
    }

    public String getTwitterURL() {
        return TwitterURL;
    }

    public void setTwitterURL(String twitterURL) {
        TwitterURL = twitterURL;
    }

    public String getInstagramURL() {
        return InstagramURL;
    }

    public void setInstagramURL(String instagramURL) {
        InstagramURL = instagramURL;
    }



    public void set_ROLE(String role) {
        this._ROLE.add(role);
    }

    public List<String> getRoles() {
        return _ROLE;
    }
    public void setRoles(List<String> roles) {
        this._ROLE = roles;
    }
    public void addRole(String role) {
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

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", PhoneNumber=" + PhoneNumber +
                ", Adress='" + Adress + '\'' +
                ", City='" + City + '\'' +
                ", Country='" + Country + '\'' +
                ", BirthDate=" + BirthDate +
                ", FacebookURL='" + FacebookURL + '\'' +
                ", GithubURL='" + GithubURL + '\'' +
                ", LinkedinURL='" + LinkedinURL + '\'' +
                ", TwitterURL='" + TwitterURL + '\'' +
                ", InstagramURL='" + InstagramURL + '\'' +
                ", resetToken='" + resetToken + '\'' +
                ", tokenExpiryDate=" + tokenExpiryDate +
                ", failedAttempts=" + failedAttempts +
                ", isBlocked=" + isBlocked +
                ", _ROLE=" + _ROLE +
                '}';
    }
}

