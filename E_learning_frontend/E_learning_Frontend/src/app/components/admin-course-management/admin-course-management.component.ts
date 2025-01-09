import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import Swal from 'sweetalert2';
import { ViewCourseComponent } from '../view-course/view-course.component';

@Component({
  selector: 'app-admin-course-management',
  templateUrl: './admin-course-management.component.html',
  styleUrls: ['./admin-course-management.component.css']
})
export class AdminCourseManagementComponent implements OnInit {
  searchText: string = '';

    Courses : any[] = [];
    User:any;
    constructor(private http: HttpClient,private cdr: ChangeDetectorRef, private dialog: MatDialog,private courseService:CourseService) {}
  
    ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.Courses = data;


    }
    );
    }
    
  

editCourse(courseId: string) {
  // Edit course logic
}
   
  
    
    deleteCourse(CourseID: string): void {
      Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.courseService.deleteCourse(CourseID).subscribe(() => {
            // Update the local course list
            this.Courses = this.Courses.filter((c) => c.id !== CourseID);
            this.cdr.detectChanges();
          });
        }
      });
    } 
  
   
    viewCourse(CourseID: string): void {
      this.courseService.getCourseById(CourseID).subscribe((data) => {
        this.User = data;
        console.log(this.User);
        if (this.User) {
          this.dialog.open(ViewCourseComponent, {
            data: this.User,
            width: '400px',
          });
        }
        
      }
    );
    
    }
  }

