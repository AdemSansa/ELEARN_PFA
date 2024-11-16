package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    MongoDatabaseFactory mongoDatabaseFactory;
    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {

        return this.userRepository.findAll();
    }
    public User editUser(User user) {
        // Fetch the existing user by ID
        Optional<User> existingUserOptional = this.userRepository.findById(user.getId());

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            // Update fields with new values, ensuring no null overwrites
            if (user.getName() != null) {
                existingUser.setName(user.getName());
            }
            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }
            if (user.getPassword() != null) {
                existingUser.setPassword(SecurityConfig.passwordEncoder().encode(user.getPassword()));;
            }

            // Save the updated user
            return this.userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User with ID " + user.getId() + " not found");
        }
    }
    public void deleteUser(User user) {
        this.userRepository.delete(user);
    }






}
