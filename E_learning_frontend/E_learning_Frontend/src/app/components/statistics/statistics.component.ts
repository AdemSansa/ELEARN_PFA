import { Component } from '@angular/core';
import { data } from 'jquery';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {



  courses: any[] = []; // Store all courses with their enrollment data
  coursesID:any[] =[]
  constructor(private EnrollmentService: EnrollmentService ,private courseService:CourseService) {}

  ngOnInit(): void {
    this.loadMostEnrolledCourses();
  }

  loadMostEnrolledCourses(): void {
    // Example: Replace this with IDs of your courses
  this.EnrollmentService.getMostEnrolledCourses().subscribe(
    (data) =>{
     this.courses = data
     console.log(data);
     
     
     
    }
  )
}

  


}
