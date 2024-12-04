import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent {
 
  courses: any[] = [];
  userId: string | null = null;

  constructor(private EnrollmentService: EnrollmentService,private auth:AuthService) {}

  ngOnInit(): void {
    // Get user ID (assume you store it in local storage or decoded token)
    
    const decodedToken = this.auth.decodeToken();
    this.userId = decodedToken?.id || null; // Replace `id` with the key for user ID in your token
    

    if (this.userId) {
      this.EnrollmentService.getEnrolledCourses(this.userId).subscribe(
        (data) => {
          this.courses = data; // Assuming API returns an array of courses
        },
        (error) => {
          console.error('Error fetching user courses:', error);
        }
      );
    }
  }
}
