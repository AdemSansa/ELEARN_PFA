import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterFeature } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
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

  
  
  constructor(private courseService : CourseService ,private enrollmentService:EnrollmentService ,private auth:AuthService,private router:Router) { }




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
    const user = this.auth.decodeToken();
    this.userId = user.id;
  
    // SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to enroll in this course?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, enroll me!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with enrollment if confirmed
        this.enrollmentService.enrollInCourse(this.userId, courseId).subscribe(
          (response) => {
            console.log('Enrollment successful:', response);
            Swal.fire('Success', 'Enrollment successful!', 'success');
            this.router.navigate([this.router.url]);

          },
          (error) => {
            console.error('Error enrolling:', error);
            Swal.fire('Error', 'Already Enrolled In this Course.', 'error');
          }
        );
      } else {
        // Optional: Handle cancellation
        console.log('Enrollment cancelled by the user.');
      }
    });
  }

  // Fetch courses by author
  getCoursesByAuthor(author: string): void {
    this.courseService.getCourseByAuthor(author).subscribe((data) => {
      this.courses = data;
    });
  }
}
