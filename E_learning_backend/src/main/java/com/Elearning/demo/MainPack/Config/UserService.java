package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Components.JwtUtil;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


    @Service
    public class UserService {

        private final UserRepository userRepository;

        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        public String banUser(String userId) {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            //clear role
            user.setRoles(Collections.emptyList());
            userRepository.save(user);
            return "User banned successfully";
        }

        public String deleteUser(String userId) {
            userRepository.deleteById(userId);
            return "User deleted successfully";
        }
        public User getUserById(String userId) {
            return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        }
        //Edit User
        public User editUser(String userId, User user) {
            User existingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setRoles(user.getRoles());
            existingUser.setAdress(user.getAdress());
            existingUser.setCity(user.getCity());
            existingUser.setCountry(user.getCountry());
            existingUser.setBirthDate(user.getBirthDate());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            existingUser.setFacebookURL(user.getFacebookURL());
            existingUser.setGithubURL(user.getGithubURL());
            existingUser.setLinkedinURL(user.getLinkedinURL());
            existingUser.setTwitterURL(user.getTwitterURL());
            existingUser.setInstagramURL(user.getInstagramURL());
            existingUser.setBirthDate(user.getBirthDate());
            return userRepository.save(existingUser);
        }
        public User updateRoles(String userId, List<String> roles) {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            user.setRoles(roles);
            return userRepository.save(user);
        }

    }


