package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByAuthor(String author);
    List<Course> findByTitle(String title);
    List<Course> findByDescription(String description);
    List<Course> findByCreatedDate(String createdDate);
    long count();

}
