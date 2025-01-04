import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-quiz',
  templateUrl: './teacher-quiz.component.html',
  styleUrls: ['./teacher-quiz.component.css']
})


export class TeacherQuizComponent implements OnInit {



i:number = 0;
quizzes : Quiz[]=  [];
userId: string = ''; // Replace this with the user ID from authentication

constructor(private quizService: QuizService, private route: ActivatedRoute ,private router:Router,private authService:AuthService) { }

ngOnInit(): void {
  // You can get the userId from a route parameter or from authentication context
  this.userId = this.authService.decodeToken().id ; // Replace this with actual user ID logic

  this.fetchQuizzes();
}

fetchQuizzes(): void {
  this.quizService.GetQuizByUserId(this.userId).subscribe(
    (data) => {
      this.quizzes = data;
      this.quizzes.forEach(quiz => {
        quiz.numberOfQuestions = quiz.questions.length;
      });
      this.quizzes.forEach(quiz => {

        this.timesplayed(quiz.id,quiz.timePlayed);
        console.log("bawwww");
        
        console.log(quiz.timePlayed);
        
      }
    );
      
    },
    (error) => {
      console.error('Error fetching quizzes:', error);
    }
  );
}
timesplayed(quizID:string,len:number): void
{
  this.quizService.TimesPlayed(quizID).subscribe(
    (data) => {
      len= data.length;
      console.log(len);
    
      this.quizzes[this.i].timePlayed = len;
      this.i++;
     
      
    },
    (error) => {
      console.error('Error fetching times ', error);
    })

}
deleteQuiz(quizId: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this quiz? This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.quizService.DeleteQuiz(quizId).subscribe(
        (response) => {
          Swal.fire('Deleted!', 'The quiz has been deleted.', 'success');
          this.fetchQuizzes(); // Refresh the quiz list
        },
        (error) => {
          Swal.fire('Error!', 'There was an issue deleting the quiz.', 'error');
          console.error('Error deleting quiz:', error);
        }
      );
    }
  });
}













  onCreateQuiz() {
    this.router.navigate(['/CreateQuiz']);
  }


}

export interface Quiz {
  id: string; // The unique identifier for the quiz
  subjectId: string; // The subject for the quiz (e.g., "quiz")
  title: string; // The title of the quiz
  duration: number; // The duration in minutes
  userId: string; // The user ID of the creator
  questions: Question[]; // The array of questions
  numberOfQuestions?: number; // Optional: The number of questions in the quiz
  timePlayed?: any; // Optional: The number of times the quiz has been played
  
}

export interface Question {
  content: string; // The question text
  options: string[]; // Array of answer options
  correctOption: number; // Index of the correct option
}