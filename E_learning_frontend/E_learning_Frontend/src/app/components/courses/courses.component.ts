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

  TeacherName: any = this.auth.userName;  

  constructor(private courseService : CourseService ,private enrollmentService:EnrollmentService ,public auth:AuthService,private router:Router) { }


    ngOnInit(): void {
      const user = this.auth.decodeToken();
      this.otherUser = user?.id;
      var count=0
      console.log(this.auth.getIsTeacher());
      
  
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

  coursess = [
    {
      title: 'Python',
      backgroundImage: 'assets/pyBack.jpg',
      logo: 'assets/pyLogo.png',
    },
    {
      title: 'JavaScript',
      backgroundImage: 'assets/JsBack.png',
      logo: 'assets/JsLogo.png',
    },
    {
      title: 'Java',
      backgroundImage: 'assets/JavaBack.jpg',
      logo: 'assets/JavaLogo.png',
    },
    // Add more courses as needed
  ];
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
        console.log('Enrollment cancelled by the usera');
      }
    });
  }

  // Fetch courses by author
  getCoursesByAuthor(author: string): void {
    this.courseService.getCourseByAuthor(author).subscribe((data) => {
      this.courses = data;
    });
  }


  addCourse() {
    const author=this.TeacherName;
    Swal.fire({
      title: 'Add New Course',
      html: `
        <input id="course-title" class="swal2-input" placeholder="Course Title" />
        <textarea id="course-description" class="swal2-input" placeholder="Course Description"></textarea>
      <input id="course-back" class="swal2-input" placeholder="Background Image URL" />
      <input id="course-logo" class="swal2-input" placeholder="Logo URL" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Course',
      preConfirm: () => {
        const title = (document.getElementById('course-title') as HTMLInputElement)?.value;
        const description = (document.getElementById('course-description') as HTMLTextAreaElement)?.value;
        const backgroundImage = (document.getElementById('course-back') as HTMLTextAreaElement)?.value;
        const logo = (document.getElementById('course-logo') as HTMLTextAreaElement)?.value
        if (!title || !description ) {
          Swal.showValidationMessage('Please fill in all fields');
          return null;
        }

        return { title, description,author};
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description, author,logo,backgroundImage} = result.value!;
        const newCourse = { title, description, author,logo,backgroundImage };

        this.courseService.createCourse(newCourse).subscribe(
          (response) => {
            Swal.fire('Success', 'Course added successfully!', 'success');
            this.loadCourses(); 
          },
          (error) => {
            Swal.fire('Error', 'Failed to add course.', 'error');
            console.error('Error adding course:', error);
          }
        );
      }
    });
  }
}
