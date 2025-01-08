package com.Elearning.demo.MainPack.Config;

import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Enrollment;
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
}