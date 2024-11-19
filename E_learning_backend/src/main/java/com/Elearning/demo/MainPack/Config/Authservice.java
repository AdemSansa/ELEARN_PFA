package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class  Authservice {
    private final UserRepository userRepository;


    private final PasswordEncoder passwordEncoder;



    @Autowired
    public Authservice(UserRepository userRepository, PasswordEncoder passwordEncoder) {
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
        newUser.setPassword(SecurityConfig.passwordEncoder().encode(password));
        return userRepository.save(newUser);

    }
    public User loginUser(String Email, String password) {





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

        return user;
    }
}
