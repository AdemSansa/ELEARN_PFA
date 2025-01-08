package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.Lesson;
import com.Elearning.demo.MainPack.Repository.CourseRepository;
import com.Elearning.demo.MainPack.Repository.LessonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class LessonService {


    private static final Logger log = LoggerFactory.getLogger(LessonService.class);
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    public LessonService(LessonRepository lessonRepository, CourseRepository courseRepository) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
    }

    // Create a lesson and add it to a course
    public Lesson createLessonAndAssignToCourse(String courseId, Lesson lesson) {
        // Find the course
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        lesson.setCourseId(courseId); // Set the course ID

        // MongoDB will automatically generate the ID for new lessons
        Lesson savedLesson = lessonRepository.save(lesson);

        System.out.println(savedLesson.getCourseId());

        // Update the course's lesson list
        List<Lesson> lessons = course.getLessons();
        if (lessons == null) {
            lessons = new ArrayList<>();
        }
        lessons.add(savedLesson);
        course.setLessons(lessons);
        course.setUpdatedDate(new Date());

        // Save the updated course
        courseRepository.save(course);

        return savedLesson;
    }



    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    //Get lessons Per Course
    public List<Lesson> getLessonsPerCourse(String courseId) {

        return lessonRepository.findByCourseId(courseId);
    }
}
