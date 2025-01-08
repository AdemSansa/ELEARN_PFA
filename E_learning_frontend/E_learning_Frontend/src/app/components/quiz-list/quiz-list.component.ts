import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit{

  quizzes: any[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((data: any[]) => {
      this.quizzes = data;
    });
  }




  startQuiz(quizId: string): void {
    this.router.navigate([`/quiz/${quizId}`]);
  }
}
