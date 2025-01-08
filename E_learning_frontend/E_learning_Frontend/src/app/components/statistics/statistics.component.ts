import { Component } from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry } from 'chart.js';
import { data } from 'jquery';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { ForumService } from 'src/app/services/forum-service/forum.service';
import { UserService } from 'src/app/services/user.service';
import { ViewUserComponent } from '../view-user/view-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  chartType: keyof ChartTypeRegistry = 'bar'; // Explicitly set the type
  topChatters: any[] = [];
  User:any;

  public chartLabels: string[] = []; // Labels for the chart
  public chartData: ChartConfiguration<'bar'>['data'] = { // Initialize chartData
    labels: [],
    datasets: [
      {
        label: 'Enrollments',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to be responsive
    scales: {
      x: {
        ticks: {
          autoSkip: true,  // This prevents labels from being too crowded
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,  // Adjust step size for better readability
        }
      }
    }
  };

  courses: any[] = []; // Store all courses with their enrollment data
  coursesID:any[] =[]
  mostEnrolledUsers: any[] = [];
  constructor(private dialog: MatDialog, private EnrollmentService: EnrollmentService ,private courseService:CourseService, private userService:UserService,private forumService:ForumService) {}

  ngOnInit(): void {
    this.loadMostEnrolledCourses();
    this.loadFideleUsers();
  this.loadTopChatters();
  }

  
  


  loadMostEnrolledCourses(): void {
    this.EnrollmentService.getMostEnrolledCourses().subscribe((data: any[]) => {
      // Map data to chart configuration
      this.chartLabels = data.map(course => course.courseName);
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Enrollments',
            data: data.map(course => course.enrollments),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ]
      };
    });
  }
  loadFideleUsers():void
  {
    this.userService.getMostEnrolledUsers().subscribe((users) => {
      this.mostEnrolledUsers = users;

      
      console.log(this.mostEnrolledUsers);
      
      
    });
    
  }
  loadTopChatters(): void {
    this.forumService.getTopChatters().subscribe((data) => {
      this.topChatters = data;
      //add user name to topchatters 
      this.topChatters.forEach((chatter) => {
        this.userService.getUserByID(chatter._id).subscribe((user) => {
          chatter.userName = user.name;
          chatter.avatar = user.avatarURL;
        });
      });
    });
  }
  viewUser(userId: string): void {
    this.userService.getUserByID(userId).subscribe((data) => {
      this.User = data;
      console.log(this.User);
      if (this.User) {
        this.dialog.open(ViewUserComponent, {
          data: this.User,
          width: '400px',
        });
      }
      
    }
  );
  

}
}
