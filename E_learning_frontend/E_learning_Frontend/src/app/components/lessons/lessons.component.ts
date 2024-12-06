import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/services/Lesson_Service/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {

  courseId: string = '';
  lessons: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}
  

  ngOnInit(): void {
    // Get the courseId from the route
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    console.log('Course ID:', this.courseId);
    // Fetch lessons for the course
    this.lessonService.getLessonsByCourse(this.courseId).subscribe(
      (data) => {
        this.lessons = data;
        console.log('Lessons fetched:', this.lessons);
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }
}
