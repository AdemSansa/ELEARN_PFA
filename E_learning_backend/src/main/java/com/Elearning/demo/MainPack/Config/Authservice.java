package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Components.JwtUtil;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class  Authservice {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private final PasswordEncoder passwordEncoder;



    @Autowired
    public Authservice(UserRepository userRepository, PasswordEncoder passwordEncoder ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }


    public String encodePassword(String Rawpassword) {
        return passwordEncoder.encode(Rawpassword);
    }

    public Boolean matchesPassword(String Rawpassword, String EncodedPassword) {
        return passwordEncoder.matches(Rawpassword, EncodedPassword);
    }

    public User CompleteProfile(User user)
    {
        User newUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        newUser.setAdress(user.getAdress());
        newUser.setCity(user.getCity());
        newUser.setCountry(user.getCountry());
        newUser.setBirthDate(user.getBirthDate());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setFacebookURL(user.getFacebookURL());
        newUser.setGithubURL(user.getGithubURL());
        newUser.setLinkedinURL(user.getLinkedinURL());
        newUser.setTwitterURL(user.getTwitterURL());
        newUser.setInstagramURL(user.getInstagramURL());
        System.out.println(newUser.toString());
        return userRepository.save(newUser);
    }


    public User registerUser(User user)
    {

        if(userRepository.findByName(user.getName()).isPresent())
        {
            throw new RuntimeException("User already exists");
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent())
        {
            throw new RuntimeException("Email already exists");
        }
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.set_ROLE("ROLE_USER");
        newUser.setActiveRole("ROLE_USER");
        newUser.setPassword(SecurityConfig.passwordEncoder().encode(user.getPassword()));
        newUser.setAdress(user.getAdress());
        newUser.setCity(user.getCity());
        newUser.setCountry(user.getCountry());
        newUser.setBirthDate(user.getBirthDate());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setFacebookURL(user.getFacebookURL());
        newUser.setGithubURL(user.getGithubURL());
        newUser.setBlocked(false);
        newUser.setFailedAttempts(0);
        newUser.setResetToken("");
        newUser.setTokenExpiration(null);

        return userRepository.save(newUser);


    }
    public String loginUser(String Email, String password, List<String> roles) throws Exception{

        User user = userRepository.findByEmail(Email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user.isBlocked())
        {
            throw new RuntimeException("User is blocked due to multiple failed attempts");
        }

        if (!this.matchesPassword(password, user.getPassword())) {
            user.setFailedAttempts(user.getFailedAttempts() + 1);
            if (user.getFailedAttempts() >= 3) {
                user.setBlocked(true);
            }
            userRepository.save(user);
            throw new RuntimeException("Invalid password");
        }
        // Reset failed attempts if login is successful
        user.setFailedAttempts(0);
        user.setActive(true);
        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail(),user.getName(),user.getId(),user.getRoles(),user.getAvatarURL());
    }

    public boolean validateToken(String token) {
        try {
            return jwtUtil.validateToken(token);
        } catch (JwtException e) {
            return false;
        }
    }



}
