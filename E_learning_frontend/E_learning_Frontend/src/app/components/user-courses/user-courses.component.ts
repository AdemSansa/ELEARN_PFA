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
          console.log('Enrolled courses:', this.courses);
          
          this.courses.forEach(enrollment => {
            console.log('Fetching progress for course ID:', enrollment.course.id);

            if (this.userId && enrollment && enrollment.course) {
              this.EnrollmentService.getProgress(this.userId, enrollment.course.id).subscribe(
                (progressData) => {
                  console.log('Progress data for course ID ' + enrollment.course.id + ':', progressData);
                  enrollment.course.progress = progressData || 0;
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
 
/////////////////////////////////////////// Progress bar animation ///////////////////////////////////////////
intervals = new Map<any, any>();

onCourseHover(course: any): void {
 
  if (this.intervals.has(course)) {
    clearInterval(this.intervals.get(course)); // Stop the current animation
    this.intervals.delete(course); // Remove it from the map
  }

  // Ensure the target progress is correctly set
  const targetProgress = course.course.progress;
  this.animateProgressBar(course, targetProgress);
}

animateProgressBar(course: any, targetProgress: number): void {
  console.log('Animating progress for course:', course, 'Target progress:', targetProgress);
  
  let currentProgress = 0; 
  const animationDuration = 3000;
  const updateInterval = 10; 
  const progressStep = targetProgress / (animationDuration / updateInterval);
  

  const interval = setInterval(() => {
    currentProgress += progressStep;


    // Stop the animation when the target progress is reached
    if (currentProgress >= targetProgress) {
      currentProgress = targetProgress;
      clearInterval(interval); // Stop the animation once the target progress is reached
      this.intervals.delete(course); // Remove from the map since the animation is done
    }

    // Update the progress of the course to reflect the animation
    course.course.progress = Math.round(Math.min(Math.max(currentProgress, 0), 100));

  }, updateInterval);

  // Store the interval ID in the map to clear it later
  this.intervals.set(course, interval);
}
 
}