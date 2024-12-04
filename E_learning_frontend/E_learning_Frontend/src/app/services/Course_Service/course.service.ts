import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8081/api/courses';

  constructor(private http :HttpClient) { }

  //Get All Courses
  getAllCourses(){
    return this.http.get<any>(`${this.apiUrl}`);
  }

  //Get Course By Author
  getCourseByAuthor(author: string){
    return this.http.get<any>(`${this.apiUrl}/author/${author}`);
  }

}
