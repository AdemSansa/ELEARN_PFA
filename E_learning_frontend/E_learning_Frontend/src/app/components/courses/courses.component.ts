import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courses: any[] = [];
  userId: string = '';
  
  
  constructor(private courseService : CourseService ,private enrollmentService:EnrollmentService) { }

  ngOnInit(): void {
    this.loadCourses();
    
  }
   // Load all courses
   loadCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }
   // Enroll user in a course
   enroll(courseId: string): void {
    this.enrollmentService.enrollInCourse(this.userId, courseId).subscribe(
      (response) => {
        console.log('Enrollment successful:', response);
        alert('Enrollment successful!');
      },
      (error) => {
        console.error('Error enrolling:', error);
        alert('Error enrolling in course.');
      }
    );
  }

  // Fetch courses by author
  getCoursesByAuthor(author: string): void {
    this.courseService.getCourseByAuthor(author).subscribe((data) => {
      this.courses = data;
    });
  }
}
