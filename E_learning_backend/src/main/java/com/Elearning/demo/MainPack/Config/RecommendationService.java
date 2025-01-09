package com.Elearning.demo.MainPack.Config;

import com.Elearning.demo.MainPack.Model.Category;
import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.CategoryRepository;
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
    @Autowired
    private CategoryRepository categoryRepository;

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
        System.out.println("Fetching all courses...");
        List<Course> allCourses = courseRepository.findAll();
        List<Category> categories = categoryRepository.findAll();

        // List to store recommended courses (use a set to avoid duplicates)
        Set<Course> recommendedCourses = new HashSet<>();

        // Fetch all enrollments of the user to avoid recommending already enrolled/completed courses
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());
        Set<String> enrolledCategoryNames = new HashSet<>();
        Set<String> enrolledCourseIds = new HashSet<>();

        // Track which courses the user has completed or is enrolled in
        for (Enrollment enrollment : enrollments) {
            enrolledCategoryNames.add(enrollment.getCourse().getCategory().getName());
            enrolledCourseIds.add(enrollment.getCourse().getId());
        }

        // Loop through all categories to check if they match the user's preferences
        for (Category category : categories) {
            // Loop through the user's preferences to check for a match
            for (String preference : user.getPreferences()) {
                System.out.println("Checking preference: " + preference + " for category: " + category.getName());
                if (category.getName().equalsIgnoreCase(preference)) {
                    // Skip recommending courses from categories the user is already enrolled in
                    if (enrolledCategoryNames.contains(category.getName())) {
                        System.out.println("User is already enrolled in a course from this category. Skipping...");
                        continue; // Move to the next category
                    }

                    // Recommend courses of the same category that the user hasn't completed
                    List<Course> courses = courseRepository.findByCategory(category);
                    for (Course course : courses) {
                        // Skip courses that the user has already completed or is enrolled in
                        if (enrolledCourseIds.contains(course.getId())) {
                            System.out.println("User is already enrolled/completed this course: " + course.getTitle());
                            continue; // Skip this course
                        }
                        recommendedCourses.add(course); // Add course to the recommendations
                        System.out.println("Course added: " + course.getTitle());
                    }
                    break; // No need to check other preferences once a match is found for this category
                }
            }
        }

        // Convert set to list before returning (if you want a list of courses)
        return new ArrayList<>(recommendedCourses);
    }



}