package com.Elearning.demo.MainPack.Services;

import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.User;
import com.Elearning.demo.MainPack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;


    public void sendPasswordResetEmail(String email, String resetToken) {
        String resetLink = "http://localhost:4200/reset-password?token=" + resetToken;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the link to reset your password: " + resetLink +
                "\nNote: The link is valid for 30 minutes.");
        mailSender.send(message);
    }

    public void sendEmail(String email, String teacher, String courseName) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Email Subject
        mailMessage.setSubject("📚 New Course Alert: " + courseName + " by " + teacher);

        // Email Body
        String emailBody = "Hello,\n\n" +
                "We are excited to inform you that a new course has been published on our platform!\n\n" +
                "🎓 Course Name: " + courseName + "\n" +
                "👩‍🏫 Instructor: " + teacher + "\n\n" + "\n\n" +
                "Don't miss out on this opportunity to enhance your learning experience.\n\n" +
                "Click below to access the course now:\n" +
                "Best regards,\n" +
                "Your Learning Platform Team Learnify ";

        mailMessage.setTo(email);
        mailMessage.setText(emailBody);
        mailSender.send(mailMessage);

    }

    public void sendQuizNotificationEmail(String email, String teacher, String quizTitle) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Email Subject
        mailMessage.setSubject("📝 New Quiz Available: " + quizTitle + " by " + teacher);

        // Email Body
        String emailBody = "Hello,\n\n" +
                "Great news! A new quiz has been published on our platform. Test your knowledge and track your progress!\n\n" +
                "📌 Quiz Title: " + quizTitle + "\n" +
                "👨‍🏫 Published By: " + teacher + "\n\n" +
                "Take the quiz now and see how much you've learned:\n" +
                "Best regards,\n" +
                "Your Learning Platform Team : Learnify";

        mailMessage.setTo(email);
        mailMessage.setText(emailBody);
        mailSender.send(mailMessage);
    }

    public void sendQuizResultEmail(String email, String userName, String quizTitle, int userScore, int totalScore, int passingGrade) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Email Subject
        mailMessage.setSubject("🎉 Congratulations on Completing the Quiz: " + quizTitle);

        // Determine Pass/Fail Status
        String statusMessage =  passingGrade >=60
                ? "You have successfully passed the quiz! 🏆"
                : "Unfortunately, you did not pass the quiz this time. 😞";

        // Email Body
        String emailBody = "Hello " + userName + ",\n\n" +
                "Thank you for completing the quiz titled \"" + quizTitle + "\". Here are your results:\n\n" +
                "📊 Your Score: " + userScore + " / " + totalScore + "\n" +
                "✅ Passing Grade: " + passingGrade + "\n" +
                statusMessage + "\n\n" +
                "Keep up the great work and continue learning! If you'd like to retake the quiz or explore more courses, visit the platform now:\n" +

                "Best regards,\n" +
                "Your Learning Platform Team";

        mailMessage.setTo(email);
        mailMessage.setText(emailBody);
        mailSender.send(mailMessage);
    }
}

