import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';

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
  constructor( private Auth:AuthService , private quizService:QuizService) { }
  ngOnInit(): void {
    this.user = this.Auth.getUserInfo().subscribe((data)=>{
     
      this.user = data;
      this.quizService.getQuizByUserId(this.user.id).subscribe((data)=>{
        this.quizzes = data;
        console.log(this.quizzes);
        

       

        
      })

    })
  }
    // SHow Quiz details
    showQuizdetails(quizId:string){
      this.quizService.getQuizById(quizId).subscribe((data)=>{
        this.result = data;
        console.log(this.result.title);
      })

    

  
  
  }

  
 
  
  

}
