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

   
  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, course);
  }
  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
