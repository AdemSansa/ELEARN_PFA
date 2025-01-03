package com.Elearning.demo.MainPack.Repository;

import com.Elearning.demo.MainPack.Model.Course;
import com.Elearning.demo.MainPack.Model.CourseEnrollmentCount;
import com.Elearning.demo.MainPack.Model.Enrollment;
import com.Elearning.demo.MainPack.Model.User;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EnrollementRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByUser(User user);
    List<Enrollment> findByCourse(Course course);

    @Aggregation(pipeline = {
            "{ '$group': { '_id': '$courseId', 'count': { '$sum': 1 } } }"
    })
    List<CourseEnrollmentCount> findCourseEnrollmentCounts();

}
