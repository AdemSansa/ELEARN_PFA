package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Components.JwtUtil;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Model.UserEnrollmentDTO;
import com.Elearning.demo.MainPack.Repository.EnrollementRepository;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
    public class UserService {

        private final UserRepository userRepository;
        private final EnrollementRepository enrollmentRepository;

        public UserService(UserRepository userRepository, EnrollementRepository enrollmentRepository) {
            this.userRepository = userRepository;
            this.enrollmentRepository = enrollmentRepository;
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
        // get All emails
        public List<String> getAllEmails() {
            List<User> users = userRepository.findAll();
            List<String> emails = new ArrayList<>();
            for (User user : users) {
                emails.add(user.getEmail());
            }
            return emails;
        }


        // get Users with the most enrollments
        public List<UserEnrollmentDTO> getUsersWithMostEnrollments() {
            List<User> users = userRepository.findAll();
            List<UserEnrollmentDTO> userEnrollmentList = new ArrayList<>();

            for (User user : users) {
                int enrollmentCount = enrollmentRepository.findByUser(user).size();
                userEnrollmentList.add(new UserEnrollmentDTO(user.getId(), user.getName(), enrollmentCount));
            }

            // Sort by enrollment count in descending order
            userEnrollmentList.sort((u1, u2) -> Integer.compare(u2.getEnrollmentCount(), u1.getEnrollmentCount()));

            return userEnrollmentList;
        }



    }


