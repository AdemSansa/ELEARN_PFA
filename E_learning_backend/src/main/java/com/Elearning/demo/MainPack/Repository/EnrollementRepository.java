package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.CourseEnrollmentCount;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.User;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollementRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByUser(User user);
    List<Enrollment> findByCourse(Course course);
    Optional<Enrollment> findByUserIdAndCourseId(String userId, String courseId);

    @Aggregation(pipeline = {
            "{ '$group': { '_id': '$courseId', 'count': { '$sum': 1 } } }"
    })
    List<CourseEnrollmentCount> findCourseEnrollmentCounts();

}
