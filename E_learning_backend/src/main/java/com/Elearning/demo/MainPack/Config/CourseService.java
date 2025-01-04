package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;


    public Course createCourse(Course course) {
        course.setCreatedDate(new Date());
        course.setUpdatedDate(new Date());
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
}
