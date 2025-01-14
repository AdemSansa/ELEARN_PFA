package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends MongoRepository<Result, String> {
    List<Result> findByUserId(String userId);
    List<Result> findByQuizId(String quizId);
}