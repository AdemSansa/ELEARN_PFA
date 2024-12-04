package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Components.JwtUtil;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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




    public User registerUser(String username , String email , String password)
    {

        if(userRepository.findByName((username)).isPresent())
        {
            throw new RuntimeException("User already exists");
        }
        if(userRepository.findByEmail(email).isPresent())
        {
            throw new RuntimeException("Email already exists");
        }
        User newUser = new User();
        newUser.setName(username);
        newUser.setEmail(email);
        newUser.set_ROLE("ROLE_USER");
        newUser.setPassword(SecurityConfig.passwordEncoder().encode(password));
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
        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail(),user.getName(),user.getId(),roles);
    }

    public boolean validateToken(String token) {
        try {
            return jwtUtil.validateToken(token);
        } catch (JwtException e) {
            return false;
        }
    }
}
