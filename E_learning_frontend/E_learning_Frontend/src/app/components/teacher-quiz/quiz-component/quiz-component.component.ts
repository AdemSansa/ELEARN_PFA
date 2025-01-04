import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/Quiz_service/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz-component.component.html',
  styleUrls: ['./quiz-component.component.css']
})
export class QuizComponentComponent {

  quiz = {
    subjectId: '',
    title: '',
    duration: 0,
    userId:'',
    questions: [] as Question[]
  };
  constructor(private quizService: QuizService,private authService:AuthService) {}
 



  addQuestion() {
    this.quiz.questions.push({
  
      content: '',
      options: [],
      correctOption: 0
    });
  }

  removeQuestion(index: number) {
    this.quiz.questions.splice(index, 1);
  }

  submitQuiz() {
    this.quiz.userId = this.authService.decodeToken().id;
    this.quizService.addQuiz(this.quiz).subscribe(
      response => {
        Swal.fire('Success', 'Quiz created successfully!', 'success');
        this.quiz = { subjectId: '', title: '', duration: 0, questions: [],userId:''}; // Reset form
      },
      error => {
        Swal.fire('Error', 'Failed to create quiz.', 'error');
      }
    );
  }
  addOption(question: Question) {
    question.options.push('');
  }
}
export interface Question {
  content: string;
  options: string[];
  correctOption: number;
}