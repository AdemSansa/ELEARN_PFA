import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private EnrollmentService: EnrollmentService, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.fetchUserCourses();
  }

  private fetchUserCourses(): void {
    const decodedToken = this.auth.decodeToken();
    this.userId = decodedToken?.id || null;
    console.log('Decoded User ID:', this.userId);

    if (this.userId) {
      console.log('Fetching enrolled courses for user:', this.userId);

      this.EnrollmentService.getEnrolledCourses(this.userId).subscribe(
        (data) => {
          console.log('Enrolled courses data:', data);
          this.courses = data;

          this.courses.forEach(enrollment => {
            console.log('Fetching progress for course ID:', enrollment.course.id);

            if (this.userId && enrollment && enrollment.course) {
              this.EnrollmentService.getProgress(this.userId, enrollment.course.id).subscribe(
                (progressData) => {
                  console.log('Progress data for course ID ' + enrollment.course.id + ':', progressData);
                  enrollment.course.progress = progressData?.progress || 0;
                  console.log('Progress for course ID ' + enrollment.course.id + ':', enrollment.course.progress);
                },
                (error) => {
                  console.error('Error fetching progress for course ID ' + enrollment.course.id + ':', error);
                }
              );
            }
          });
        },
        (error) => {
          console.error('Error fetching user courses:', error);
        }
      );
    } else {
      console.log('No userId found!');
    }
  }


  StartCourse(courseId: string): void {
    this.router.navigate(['/lessons', courseId]);
  }

}