  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class EnrollmentService {

    private apiUrl = 'http://localhost:8081/api/enrollments';
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
    getEnrolledUsers(courseId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/enrolledUsers/${courseId}`);
    }
    completeLesson(userId: string, courseId: string, lessonId: string): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/${courseId}/lessons/${lessonId}/complete?userId=${userId}`, {});
    }
  
    getProgress(userId: string, courseId: string): Observable<number> {
      return this.http.get<number>(`/api/enrollments/${courseId}/progress?userId=${userId}`);
    }
    getCompletedLessons(userId: string, courseId: string): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/${courseId}/completedLessons?userId=${userId}`);
    }
  }
