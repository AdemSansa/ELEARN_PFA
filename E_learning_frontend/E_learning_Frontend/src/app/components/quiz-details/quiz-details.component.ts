import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quiz: any;
  selectedAnswers: number[] = [];
  timeLeft: number = 0;
  interval: any;
  startTime: number =0;
  data:any;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(quizId!).subscribe((data: any) => {
      this.quiz = data;
      this.selectedAnswers = Array(this.quiz.questions.length).fill(-1);
      this.timeLeft = this.quiz.duration * 60;
      this.startTime = Date.now();
      this.startTimer();
    });
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.submitQuiz();
      }
    }, 1000);
  }

  selectAnswer(questionIndex: number, optionIndex: number): void {
    this.selectedAnswers[questionIndex] = optionIndex;
  }

  submitQuiz(): void {
    clearInterval(this.interval);
    const userId = this.authService.decodeToken().id;
    console.log(userId);
     // Replace with actual user ID logic
    this.quizService
      .submitQuiz(this.quiz.id, userId, this.startTime, this.selectedAnswers)
      .subscribe((response) => {
  
        
        alert('Quiz submitted successfully!');
        const result = {
          score: response.score,
          pass: response.passed,
          total:response.totalScore,
        };
      
        this.router.navigate(['/results'], { state: { result } });
      });
  }
}
