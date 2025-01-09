package com.Elearning.demo.MainPack.Config;

import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import com.Elearning.demo.MainPack.Repository.EnrollementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class RecommendationService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollementRepository enrollmentRepository;

    // Get recommended courses based on user progress and enrolled categories
    public List<Course> getRecommendedCourses(String userId) {
        // Fetch courses the user is already enrolled in
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        Set<String> enrolledCategories = new HashSet<>();

        // Create a map to track progress in each category
        Map<String, Integer> categoryProgress = new HashMap<>();

        // Get all categories of courses the user is enrolled in and track their progress
        for (Enrollment enrollment : enrollments) {
            Course course = enrollment.getCourse();
            enrolledCategories.add(course.getCategory().getName());

            // Track user progress in the category
            int courseProgress = enrollment.getProgress();
            categoryProgress.merge(course.getCategory().getName(), courseProgress, Integer::sum);
        }

        // Calculate average progress in each category
        Map<String, Integer> categoryCounts = new HashMap<>();
        for (String categoryName : enrolledCategories) {
            categoryCounts.put(categoryName, categoryCounts.getOrDefault(categoryName, 0) + 1);
        }

        // Calculate average progress for each category
        for (Map.Entry<String, Integer> entry : categoryProgress.entrySet()) {
            entry.setValue(entry.getValue() / categoryCounts.get(entry.getKey()));
        }

        // Now recommend based on progress (recommend other courses from the same category)
        List<Course> recommendedCourses = new ArrayList<>();
        for (String categoryName : enrolledCategories) {
            List<Course> courses = courseRepository.findByCategoryName(categoryName);
            int progress = categoryProgress.get(categoryName);

            // Recommend courses based on user progress thresholds
            for (Course course : courses) {
                // Skip courses that the user is already enrolled in
                if (enrollments.stream().noneMatch(enrollment -> enrollment.getCourse().getId().equals(course.getId()))) {
                    if (progress < 25) {
                        // For users with 0-25% progress: recommend introductory courses
                        if (course.getDescription().contains("beginner")) {
                            recommendedCourses.add(course);
                        }
                    } else if (progress < 75) {
                        // For users with 26-75% progress: recommend intermediate courses
                        if (course.getDescription().contains("intermediate")) {
                            recommendedCourses.add(course);
                        }
                    } else {
                        // For users with 76-100% progress: recommend advanced courses
                        if (course.getDescription().contains("advanced")) {
                            recommendedCourses.add(course);
                        }
                    }
                }
            }
        }

        return recommendedCourses;
    }



    public double cosineSimilarity(double[] user1, double[] user2) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < user1.length; i++) {
            dotProduct += user1[i] * user2[i];
            normA += Math.pow(user1[i], 2);
            normB += Math.pow(user2[i], 2);
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    // Get recommendations for a user
    public List<Course> getRecommendedCourses(User user) {
        // Fetch all courses from the database
        List<Course> allCourses = courseRepository.findAll();

        // List to store recommended courses
        List<Course> recommendedCourses = new ArrayList<>();

        // Loop through all courses and check if they match user's preferences
        for (Course course : allCourses) {
            // Check if the course category matches any of the user's preferences
            for (String preference : user.getPreferences()) {
                if (course.getCategory().getName().equalsIgnoreCase(preference)) {
                    // Add the course to the recommended list if a match is found
                    recommendedCourses.add(course);
                    break; // No need to check other preferences if already matched
                }
            }
        }

        // Optional: Sort the courses by rating or other criteria (e.g., by difficulty, popularity)
        // Example: Sorting by rating in descending order (highest rated courses first)
        recommendedCourses.sort((course1, course2) -> Double.compare(course2.getRating(), course1.getRating()));

        return recommendedCourses;
    }
}