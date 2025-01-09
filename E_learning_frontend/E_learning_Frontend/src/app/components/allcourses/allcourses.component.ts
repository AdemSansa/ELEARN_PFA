

  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Route, Router, RouterFeature } from '@angular/router';
  import { AuthService } from 'src/app/services/auth.service';
  import { CourseService } from 'src/app/services/Course_Service/course.service';
  import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { RecommandationService } from 'src/app/services/recommandation-service/recommandation.service';
  import { UserService } from 'src/app/services/user.service';
  import Swal from 'sweetalert2';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {
   
     courses: any[] = [];
     recommendedCourses: any[] = [];
     userId: string = '';
     enrolledCourses: string[] = []; 
     TeacherName: any = this.auth.userName;
     constructor(
      private recommandationService: RecommandationService,
       private courseService: CourseService,
       private enrollmentService: EnrollmentService,
       public auth: AuthService,
       private router: Router,  private route: ActivatedRoute 
     ) {}
   
     ngOnInit(): void {
       const user = this.auth.decodeToken();
       this.userId = user?.id;
       
       
           this.loadCourses(); 
           this.GetRecommendation();
         
      
       if (this.userId) {
         this.enrollmentService.getIDSOfcoursesEnrolled(this.userId).subscribe((enrolledCourses) => {
           this.enrolledCourses = enrolledCourses;
         });
       }
   
      
     }
   
  
   
     // Method to load courses for a given category
     loadCourses(): void {
       
      this.courseService.getAllCourses().subscribe((data) => {
        this.courses = data;
      }
      );
      
     }
   
   
     // Method to check if the user is enrolled in a course
     IsEnrolled(courseId: string): boolean {
       return this.enrolledCourses.includes(courseId);
     }
   
     // Method to enroll in a course
     enroll(courseId: string): void {
       Swal.fire({
         title: 'Are you sure?',
         text: 'Do you want to enroll in this course?',
         icon: 'question',
         showCancelButton: true,
         confirmButtonText: 'Yes, enroll me!',
         cancelButtonText: 'Cancel',
       }).then((result) => {
         if (result.isConfirmed) {
           this.enrollmentService.enrollInCourse(this.userId, courseId).subscribe(
             () => {
               Swal.fire('Success', 'Enrollment successful!', 'success');
               this.ngOnInit();
             },
             (error) => {
               Swal.fire('Error', 'Already Enrolled In this Course.', 'error');
             }
           );
         }
       });
     }
   
   
     // Fetch courses by author
     getCoursesByAuthor(author: string): void {
       this.courseService.getCourseByAuthor(author).subscribe((data) => {
         this.courses = data;
       });
     }
     GetRecommendation(): void {
    
      const user = { id: 1, preferences: ['programming', 'design'] }; // Example user data
        this.recommandationService.getRecommendations(user).subscribe(data => {
  
          this.recommendedCourses = data;
    
          
  
        }
        );
        
  
    
  }
     
   }
   