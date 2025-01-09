package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.Lesson;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import com.Elearning.demo.MainPack.Repository.EnrollementRepository;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollementRepository enrollmentRepository;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enrollUserInCourse(String userId, String courseId) {
        User user = UserRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));

        List<Enrollment> existingEnrollments = enrollmentRepository.findByUser(user);
        for (Enrollment enrollment : existingEnrollments) {
            if (enrollment.getCourse().getId().equals(course.getId())) {
                throw new RuntimeException("User is already enrolled in this course");
            }
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(System.currentTimeMillis() + "");
        enrollment.setProgress(0);

        return enrollmentRepository.save(enrollment);
    }
    public List<Enrollment> getEnrollmentsByUser(User user) {
        return enrollmentRepository.findByUser(user);
    }
    public List<String> getCoursesIdsByUser(User user) {
        List<Enrollment> enrollments = enrollmentRepository.findByUser(user);
        List<String> courseIds = new ArrayList<>();
        for (Enrollment enrollment : enrollments) {
            courseIds.add(enrollment.getCourse().getId());
        }
        return courseIds;
    }

    public List<Enrollment> getEnrollmentsByCourse(Course course) {
        return enrollmentRepository.findByCourse(course);
    }
    public List<User> getEnrolledUsersByCourse(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Enrollment> enrollments = enrollmentRepository.findByCourse(course);
        List<User> enrolledUsers = new ArrayList<>();

        for (Enrollment enrollment : enrollments) {
            enrolledUsers.add(enrollment.getUser());
        }

        return enrolledUsers;
    }
    public ResponseEntity<Void> completeLesson(String userId, String courseId, String lessonId) {
        Enrollment enrollment = enrollmentRepository
                .findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        List<String> completedLessons = enrollment.getCompletedLessons();
        if (!completedLessons.contains(lessonId)) {
            completedLessons.add(lessonId);
            enrollment.setCompletedLessons(completedLessons);
        }

        // Calculate and set progress after completing the lesson
        int progress = calculateProgress(userId, courseId);
        enrollment.setProgress(progress);

        // Save updated enrollment with progress
        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok().build();
    }

    public int calculateProgress(String userId, String courseId) {
        Enrollment enrollment = enrollmentRepository
                .findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        List<String> completedLessons = enrollment.getCompletedLessons();
        List<Lesson> courseLessons = enrollment.getCourse().getLessons();

        if (courseLessons.isEmpty()) {
            return 0;
        }

        long completedCount = courseLessons.stream()
                .filter(lesson -> completedLessons.contains(lesson.getId()))
                .count();
        enrollment.setProgress((int) ((completedCount * 100) / courseLessons.size()));
        System.out.println(enrollment.getProgress());

        return (int) ((completedCount * 100) / courseLessons.size());
    }
    public List<String> getCompletedLessons(String userId, String courseId) {
        Optional<Enrollment> enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (enrollment.isPresent()) {
            return enrollment.get().getCompletedLessons();
        }
        return new ArrayList<>();
    }

}
