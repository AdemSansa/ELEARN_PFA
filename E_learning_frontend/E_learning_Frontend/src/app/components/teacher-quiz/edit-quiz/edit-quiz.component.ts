import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent {
  quiz: any = { title: '', duration: 0 };

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}
  addQuestion() {
    this.quiz.questions.push({
  
      content: '',
      options: [],
      correctOption: 0
    });
  }
 addOption(question: Question) {
    question.options.push('');
  }
  removeQuestion(index: number) {
    this.quiz.questions.splice(index, 1);
  }

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe(
        (data) => {
          this.quiz = data;
        },
        (error) => {
          console.error('Error fetching quiz:', error);
        }
      );
    }
  }

  onSubmit(): void {
    this.quizService.UpdateQuiz(this.quiz.id,this.quiz).subscribe(
      (response) => {
        alert('Quiz updated successfully!');
        this.router.navigate(['/Teacher-quiz']); // Redirect back to the quizzes list
      },
      (error) => {
        console.error('Error updating quiz:', error);
      }
    );
  }
}
export interface Question {
  content: string;
  options: string[];
  correctOption: number;
}
