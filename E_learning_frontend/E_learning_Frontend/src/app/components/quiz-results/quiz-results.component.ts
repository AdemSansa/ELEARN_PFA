import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  score!: number;
  pass!: boolean;
  feedback: any[] = [];
  total!: number;
  PassingPercentage! :number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    console.log(state);
    console.log(state.result);
    
    this.total= state.result?.total|| 0;
    this.score = state.result?.score || 0;
    this.pass = state.result?.pass || false;
    this.feedback = state.result?.feedback || [];
    this.PassingPercentage = this.score*100/this.total;
  }
}
