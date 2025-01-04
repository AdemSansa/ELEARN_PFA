import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/Course_Service/course.service';
import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
import { LessonService } from 'src/app/services/Lesson_Service/lesson.service';

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  description: string;
  completed?: boolean
}


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent {
  userId: string = ''; 
  courseId: string = '';
  isFormVisible = false; // For popup visibility
  newLesson: Lesson = { id: '', title: '', content: '', videoUrl: '', description: '' };
  lessons: Lesson[] = [];
  courseName:String="";
  selectedLesson = this.lessons[0];
  completedLessons: string[] = []; 
  constructor(private route: ActivatedRoute, private lessonService: LessonService,private sanitizer: DomSanitizer,public authSeervice:  AuthService,private courseService: CourseService, private enrollmentService:EnrollmentService) {}

  openForm() {
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }

  addLesson() {
    if (!this.newLesson.title || !this.newLesson.videoUrl) {
      alert('Title and Video URL are required!');
      return;
    }

    // Call the backend to save the lesson
    this.lessonService.addLessonToCourse(this.courseId, this.newLesson).subscribe(
      (lesson) => {
        this.lessons.push(lesson); // Add the lesson to the list
        this.selectedLesson = lesson; // Optionally auto-select the new lesson
        this.closeForm(); // Close the popup
        this.newLesson = { id: '', title: '', content: '', videoUrl: '', description: '' }; // Reset the form
      },
      (error) => {
        console.error('Error adding lesson:', error);
      }
    );
  }


  ngOnInit(): void {  this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    console.log('Course ID:', this.courseId); // Debugging courseId
  this.userId = this.authSeervice.getUserId() || '';
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe(
        (course) => {
          this.courseName = course.title ; 
        },
        (error) => {
          console.error('Error fetching course:', error);
        }
      );
  
      this.lessonService.getLessonsByCourse(this.courseId).subscribe(
        (data) => {
          console.log('Lessons fetched:', data);
          this.lessons = data;
        },
        (error) => {
          console.error('Error fetching lessons:', error);
        }
      );
    } this.enrollmentService.getCompletedLessons(this.userId, this.courseId).subscribe(
      (completedLessons) => {
        console.log('Completed Lessons:', completedLessons); // Log completed lessons
        this.completedLessons = completedLessons; // Optionally update the completed lessons array
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

  toggleLessonCompletion(lesson: Lesson, event: any) {
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
  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
  }
  onVideoComplete(): void {
    console.log('Video has ended');
    this.markLessonAsComplete();
  }

  // Method triggered on scroll
  onScroll(event: Event): void {
    const scrollPosition = (event.target as HTMLElement).scrollTop;
    console.log(`Scroll position: ${scrollPosition}`);
    this.markLessonAsComplete();
  }
  private markLessonAsComplete(): void {
    // Call your EnrollmentService to update the completion status in the backend
    this.enrollmentService.completeLesson(this.userId, this.courseId, this.selectedLesson.id)
      .subscribe(() => {
        console.log('Lesson marked as complete');
        // Optionally, update the UI by changing the checkbox state
        this.selectedLesson.completed = true;
      });
  }
}