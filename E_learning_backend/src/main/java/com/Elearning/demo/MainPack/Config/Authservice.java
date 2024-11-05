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

        if (!this.matchesPassword(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }   

        return user;
    }
}
