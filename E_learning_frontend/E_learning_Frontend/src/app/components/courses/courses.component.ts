import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { CategoryService } from 'src/app/services/category_service/category.service';  // Import category service
import Swal from 'sweetalert2';
import { RecommandationService } from 'src/app/services/recommandation-service/recommandation.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  recommendedCourses: any[] = [];
userInfo: any;
  courses: any[] = [];
  categories: any[] = []; 
  userId: string = '';
  enrolledCourses: string[] = []; 
  TeacherName: any = this.auth.userName;
  selectedCategoryId: string | null = null; 
  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private categoryService: CategoryService,  // Inject category service
    public auth: AuthService,
    private router: Router,  private route: ActivatedRoute ,
    private recommandationService: RecommandationService
  ) {}

  ngOnInit(): void {
    const user = this.auth.decodeToken();
    this.userId = user?.id;
    
    // Get categories to display them
    this.loadCategories();
    this.GetRecommendation();
    this.route.params.subscribe((params) => {
      this.selectedCategoryId = params['categoryId'] || null;
      if (this.selectedCategoryId) {
        this.loadCourses(this.selectedCategoryId); 
      } else {
        this.loadCourses(); 
      }
    });
    if (this.userId) {
      this.enrollmentService.getIDSOfcoursesEnrolled(this.userId).subscribe((enrolledCourses) => {
        this.enrolledCourses = enrolledCourses;
      });
    }

    // Load courses for a default category (if necessary)
   
  }

  // Method to load categories
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Method to load courses for a given category
  loadCourses(categoryId?: string): void {
    if (categoryId) {
      // If categoryId is provided, fetch courses by category
      this.courseService.getCoursesByCategory(categoryId).subscribe((courses) => {
        this.courses = courses;
      });
    } else {
      // If no categoryId, fetch all courses
      this.courseService.getAllCourses().subscribe((courses) => {
        this.courses = courses;
      });
    }
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




  prefererences: string[] = [];
    


  

  GetRecommendation(): void {
    console.log('Fetching recommendations...');
    
    this.auth.getUserInfo().subscribe(
      (userInfo) => {
        this.userInfo = userInfo;
        console.log('User Info:', this.userInfo);
        
        
        this.recommandationService.getRecommendations(this.userInfo.id).subscribe(
          (recommendedCourses) => {
            this.recommendedCourses = recommendedCourses;
            console.log('Recommended Courses:', this.recommendedCourses);
          },
          (error) => {
            console.error('Error fetching recommendations:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }
}