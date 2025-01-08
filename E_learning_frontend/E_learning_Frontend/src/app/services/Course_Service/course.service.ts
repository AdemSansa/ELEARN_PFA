import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8081/api/courses';

  constructor(private http :HttpClient) { }

  getAllCourses(){
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getCourseByAuthor(author: string){
    return this.http.get<any>(`${this.apiUrl}/author/${author}`);
  }

  getCoursesByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`);
  }

 
  createCourse(course: any, categoryId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?categoryId=${categoryId}`, course);
  }
  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateCourse(id: string, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, course);
  }
}
