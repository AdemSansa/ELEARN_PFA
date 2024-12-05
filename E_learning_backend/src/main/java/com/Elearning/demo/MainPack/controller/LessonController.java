package com.Elearning.demo.MainPack.controller;


import com.Elearning.demo.MainPack.Config.CourseService;
import com.Elearning.demo.MainPack.Config.LessonService;
import com.Elearning.demo.MainPack.Model.Lesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    // Create a lesson and assign it to a course
    @PostMapping("/courses/{courseId}")
    public ResponseEntity<Lesson> createLessonAndAssignToCourse(
            @PathVariable String courseId,
            @RequestBody Lesson lesson) {
        Lesson createdLesson = lessonService.createLessonAndAssignToCourse(courseId, lesson);
        return ResponseEntity.ok(createdLesson);
    }

    //get Lessons By Course
    @GetMapping("/courses/{courseId}")
    public ResponseEntity<?> getLessonsPerCourse(@PathVariable String courseId) {
        return ResponseEntity.ok(lessonService.getLessonsPerCourse(courseId));
    }






}
