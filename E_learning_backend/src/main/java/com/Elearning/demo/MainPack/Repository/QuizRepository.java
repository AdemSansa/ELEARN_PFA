package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findBySubjectId(String subjectId); // Custom query method
    List<Quiz> findByUserId(String userId); // Custom query method
}