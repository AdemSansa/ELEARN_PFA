package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Category;
import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.CourseEnrollmentCount;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import com.Elearning.demo.MainPack.Repository.EnrollementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.*;

@Service
public class CourseService {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    EnrollementRepository enrollementRepository;

    public Course createCourse(Course course, String categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        course.setCreatedDate(new Date());
        course.setUpdatedDate(new Date());
        course.setCategory(category);
        return courseRepository.save(course);
    }
    public Course updateCourse(String id, Course course) {
        Optional<Course> existingCourse = courseRepository.findById(id);
        if (existingCourse.isPresent()) {
            Course updatedCourse = existingCourse.get();
            updatedCourse.setTitle(course.getTitle());
            updatedCourse.setImageLogoUrl(course.getImageLogoUrl());
            updatedCourse.setImageUrl(course.getImageUrl());
            updatedCourse.setDescription(course.getDescription());
            updatedCourse.setAuthor(course.getAuthor());
            updatedCourse.setCategory(course.getCategory());
            updatedCourse.setUpdatedDate(new Date());
            return courseRepository.save(updatedCourse);
        } else {
            throw new RuntimeException("Course not found with id: " + id);
        }
    }

    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }


    public Course getCourseById(String id) {
        return courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByAuthor(String author) {
        return courseRepository.findByAuthor(author);
    }

    public List<Course> getCoursesByCategory(Category category) {
        return courseRepository.findByCategory(category);
    }
    public List<Map<String, Object>> getCoursesWithEnrollmentCounts() {
        List<CourseEnrollmentCount> enrollmentCounts = enrollementRepository.findCourseEnrollmentCounts();
        List<Course> courses = courseRepository.findAll();

        List<Map<String, Object>> result = new ArrayList<>();
        for (Course course : courses) {
            String courseId = course.getId();
            List <Enrollment> Enrolllments  = enrollementRepository.findByCourse(course);
            Map<String, Object> courseData = new HashMap<>();
            courseData.put("courseId", course.getId());
            courseData.put("courseName", course.getTitle());
            courseData.put("enrollments", Enrolllments.size());

            result.add(courseData);
        }
        return result;
    }
}
