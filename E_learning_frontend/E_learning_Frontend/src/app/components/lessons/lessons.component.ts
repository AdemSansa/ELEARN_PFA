import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { LessonService } from 'src/app/services/Lesson_Service/lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent {
  userId: string = ''; 
  courseId: string = '';
  isFormVisible = false; // For popup visibility
  lessons: any[] = [];
  courseName: string = "";
  selectedLesson: any = null;
  completedLessons: string[] = [];
  newLesson: any = { title: '', content: '', videoUrl: '', description: '' }; // Initialize newLesson
isTeacher: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  openForm() {
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }

  addLesson() {
    if (!this.newLesson.videoUrl.includes('youtube.com') && !this.newLesson.videoUrl.includes('youtu.be')) {
      Swal.fire('Invalid Video URL', 'Only YouTube videos are allowed.', 'error');
      return;
    }

    this.lessonService.addLessonToCourse(this.courseId, this.newLesson).subscribe(
      (lesson) => {
        console.log('Lesson added:', lesson); // Check if ID is included in response
        this.lessons.push(lesson); // Add the new lesson to the list
        this.selectedLesson = lesson; // Auto-select the new lesson
        this.closeForm(); // Close the form
        this.newLesson = { title: '', content: '', videoUrl: '', description: '' }; // Reset the form
      },
      (error) => {
        console.error('Error adding lesson:', error);
      }
    );
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    console.log('Course ID:', this.courseId); // Debugging courseId
    this.userId = this.authService.getUserId() || '';
    this.isTeacher = this.authService.isteacher();
    if (this.courseId) {
      // Fetch course details
      this.courseService.getCourseById(this.courseId).subscribe(
        (course) => {
          this.courseName = course.title; 
        },
        (error) => {
          console.error('Error fetching course:', error);
        }
      );

      // Fetch lessons for this course
      this.lessonService.getLessonsByCourse(this.courseId).subscribe(
        (data) => {
          console.log('Lessons fetched:', data);
          this.lessons = data;
          if (this.lessons.length > 0) {
            this.selectedLesson = this.lessons[0]; // Select the first lesson
          }
        },
        (error) => {
          console.error('Error fetching lessons:', error);
        }
      );
    }

    // Fetch completed lessons for the user
    this.enrollmentService.getCompletedLessons(this.userId, this.courseId).subscribe(
      (completedLessons) => {
        console.log('Completed Lessons:', completedLessons);
        this.completedLessons = completedLessons;
        this.enrollmentService.getProgress(this.userId, this.courseId).subscribe(
          (progress) => {
            console.log('Course Progress:', progress);
          },
          (error) => {
            console.error('Error fetching course progress:', error);
          }
        );
      
      },
      (error) => {
        console.error('Error fetching completed lessons:', error);
      }
    );
  }
  
  isYouTubeVideo(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  sanitizeYouTubeUrl(url: string): SafeResourceUrl {
    let videoId = '';
    if (url.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtu.be')) {
      videoId = url.split('/').pop() || '';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  isLessonCompleted(lessonId: string): boolean {
    return this.completedLessons.includes(lessonId);
  }

  toggleLessonCompletion(lesson: any, event: any) {
    const isChecked = event.target.checked;
    console.log(this.userId);
    
    this.enrollmentService.completeLesson(this.userId, this.courseId, lesson.id).subscribe(
      () => {
        if (isChecked) {
          this.completedLessons.push(lesson.id); // Add to completed lessons
        } else {
          this.completedLessons = this.completedLessons.filter(id => id !== lesson.id); // Remove from completed lessons
        }
      },
      (error) => {
        console.error('Error updating lesson completion:', error);
      }
    );
  }

  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
  }

  onVideoComplete(): void {
    console.log('Video has ended');
    this.markLessonAsComplete();
  }

  onScroll(event: Event): void {
    const scrollPosition = (event.target as HTMLElement).scrollTop;
    console.log(`Scroll position: ${scrollPosition}`);
    this.markLessonAsComplete();
  }

  private markLessonAsComplete(): void {
    this.enrollmentService.completeLesson(this.userId, this.courseId, this.selectedLesson.id).subscribe(() => {
      console.log('Lesson marked as complete');
      this.selectedLesson.completed = true;
    });
  }
}
