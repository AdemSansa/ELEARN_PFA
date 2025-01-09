import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { TaggedTemplateExpr } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  quizzes:any;
  result:any
  isShow:boolean = false;
   // list of progresse of courses
    courseprogress:any[] = [];
    // variable course with name and progress attricbutes
    Course:any = {};

    Enrollments:any[] = [];
  constructor(private authservice : AuthService,private enrollmentService: EnrollmentService, private Auth:AuthService , private quizService:QuizService , private dialog: MatDialog , private userService: UserService) { }
 


  
 
 
  ngOnInit(): void {
    this.user = this.Auth.getUserInfo().subscribe((data)=>{
     
      this.user = data;
      console.log(this.user);
      this.quizService.getQuizByUserId(this.user.id).subscribe((data)=>{
        this.quizzes = data;
        console.log(this.quizzes);
        

       

        
      })

    })

    this.enrollmentService.getEnrolledCourses(this.Auth.decodeToken().id).subscribe((data)=>{
      this.courseprogress = data;
      console.log(this.courseprogress[0].course.id); 
      console.log(this.courseprogress[1].course.title);
      console.log(this.courseprogress[2].course.title);
      for (let i = 0; i < this.courseprogress.length; i++) {
        this.enrollmentService.getProgress(this.Auth.decodeToken().id,this.courseprogress[i].course.id).subscribe((data)=>{
          this.Course = {
            name: this.courseprogress[i].course.title,
            progress: data
          }
          console.log(this.Course);
          
          this.Enrollments.push(this.Course);
        })
        
      }
      
    })
  



        
        
        

        

        
        
  
  }
    
    // SHow Quiz details
    showQuizdetails(quizId:string){
      this.quizService.getQuizById(quizId).subscribe((data)=>{
        this.result = data;
        console.log(this.result.title);
      })

      

    

  
  
  }


  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(CompleteProfileComponent, {
      width: '400px',
      data: { ...this.user } // Pass the current user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result; // Update the user data with the result from the dialog
        this.userService.editUser(this.Auth.decodeToken().id,this.user); // Update the user info in the AuthService
      }
    });
  }
  

  isTeacher(): boolean {
    return this.authservice.isteacher();
  }


 
  
  

}
