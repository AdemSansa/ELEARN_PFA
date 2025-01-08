import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8081/api/quizzes'; // Adjust if your backend URL differs
  private resultUrl = 'http://localhost:8081/api/results'; // Adjust if your backend URL differs
  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getQuizById(quizId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${quizId}`);
  }

  submitQuiz(quizId: string, userId: string, startTime: number, answers: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${quizId}/submit?userId=${userId}&startTime=${startTime}`, answers);
  }
  getQuizByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.resultUrl}/user/${userId}`);
  }
  addQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, quiz);
  }
  GetQuizByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  TimesPlayed(quizId: string): Observable<any> {
    return this.http.get(`${this.resultUrl}/timesPlayed/${quizId}`);
  }
  DeleteQuiz(quizId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${quizId}`);
  }
  UpdateQuiz(quizId: string, quiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${quizId}`, quiz);
  }
}