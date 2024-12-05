package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LessonRepository extends MongoRepository<Lesson, String> {
    List<Lesson> findByCourseId(String courseId);



}
