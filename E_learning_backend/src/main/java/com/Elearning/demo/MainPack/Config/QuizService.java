package com.Elearning.demo.MainPack.Config;


import com.Elearning.demo.MainPack.Model.Quiz;
import com.Elearning.demo.MainPack.Repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    // Fetch quizzes by subject ID


    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
    public List<Quiz> getQuizzesBySubject(String subjectId) {
        return quizRepository.findBySubjectId(subjectId);
    }

    // Fetch a quiz by its ID
    public Quiz getQuizById(String quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + quizId));
    }

    // Add a new quiz
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // Delete a quiz by its ID
    public void deleteQuiz(String quizId) {
        quizRepository.deleteById(quizId);
    }

    public List<Quiz>  findQuizByUserId(String userId){
        return quizRepository.findByUserId(userId);
    }

    //Update quiz
    public Quiz updateQuiz(String quizId, Quiz quiz){
        Quiz existingQuiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + quizId));
        existingQuiz.setSubjectId(quiz.getSubjectId());
        existingQuiz.setTitle(quiz.getTitle());
        existingQuiz.setDuration(quiz.getDuration());
        existingQuiz.setQuestions(quiz.getQuestions());
        return quizRepository.save(existingQuiz);
    }
}

