import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:8081/api/enrollments';
  private AdminURL = 'http://localhost:8081/Admin'
  constructor(private http:HttpClient) { }
  

   // Enroll user in a course 
   enrollInCourse(userId: string, courseId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enroll?userId=${userId}&courseId=${courseId}`, {});
  }
  // Get enrolled courses by user ID
  getEnrolledCourses(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }
  //getEnrolledCOursesiD of Users 
  getIDSOfcoursesEnrolled(userId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courseid/${userId}`);
  }
  // get enrollments per courses
  getMostEnrolledCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.AdminURL}/courses`);
  }
}
