import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:8081/api/lessons';


  constructor(private http: HttpClient) {}

    getLessonsByCourse(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}`);
  }
  addLessonToCourse(courseId: string, lesson: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/${courseId}`, lesson);
  }

}
