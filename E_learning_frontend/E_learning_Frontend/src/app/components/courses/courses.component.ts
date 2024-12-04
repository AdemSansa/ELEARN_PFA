import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courses: any[] = [];
  userId: string = '';
  otherUser:string="";
  enrolledCourses: string[] = []; // List of enrolled course IDs

  
  
  constructor(private courseService : CourseService ,private enrollmentService:EnrollmentService ,private auth:AuthService) { }




    ngOnInit(): void {
      // Get the logged-in user's ID
      const user = this.auth.decodeToken();
      this.otherUser = user?.id;
      var count=0
  
      // Fetch the courses the user is enrolled in
      if (this.otherUser) {
        this.enrollmentService.getIDSOfcoursesEnrolled(this.otherUser).subscribe((enrolledCourses) => {
          
      
          
          this.enrolledCourses = enrolledCourses;
        });
      }
    this.loadCourses();

    
  }
  IsEnrolled(courseId: string): boolean 
  {
    return this.enrolledCourses.includes(courseId);
  }

  
   // Load all courses
   loadCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      
      this.courses = data;
    });
  }
   // Enroll user in a course
   enroll(courseId: string): void {
 
    var user = this.auth.decodeToken();
    this.userId = user.id
    
    this.enrollmentService.enrollInCourse(this.userId, courseId).subscribe(
      (response) => {
        console.log('Enrollment successful:', response);
        alert('Enrollment successful!');
      },
      (error) => {
        console.error('Error enrolling:', error);
        alert('Already Enrolled In this Course .');
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
