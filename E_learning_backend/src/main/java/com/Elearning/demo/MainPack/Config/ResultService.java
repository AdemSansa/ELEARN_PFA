package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Result;
import com.Elearning.demo.MainPack.Repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;

    // Save a result
    public Result saveResult(Result result) {
        return resultRepository.save(result);
    }

    // Get results by user ID
    public List<Result> getResultsByUser(String userId) {
        return resultRepository.findByUserId(userId);
    }

    // Get results by quiz ID
    public List<Result> getResultsByQuiz(String quizId) {
        return resultRepository.findByQuizId(quizId);
    }

}
