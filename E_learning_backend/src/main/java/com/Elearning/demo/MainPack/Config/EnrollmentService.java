package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import com.Elearning.demo.MainPack.Repository.EnrollementRepository;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        enrollment.setEnrollmentDate(System.currentTimeMillis() + ""); // You can format this date as needed

        return enrollmentRepository.save(enrollment);

    }
    public List<Enrollment> getEnrollmentsByUser(User user) {
        return enrollmentRepository.findByUser(user);
    }

    public List<Enrollment> getEnrollmentsByCourse(Course course) {
        return enrollmentRepository.findByCourse(course);
    }

}
