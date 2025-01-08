    import { Component, OnInit } from '@angular/core';
    import { AuthService } from 'src/app/services/auth.service';
  import { CategoryService } from 'src/app/services/category_service/category.service';
    import { CourseService } from 'src/app/services/Course_Service/course.service';
    import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
    import { UserService } from 'src/app/services/user.service';
    import Swal from 'sweetalert2';
    @Component({
      selector: 'app-teacher-courses',
      templateUrl: './teacher-courses.component.html',
      styleUrls: ['./teacher-courses.component.css']
    })
    export class TeacherCoursesComponent  implements OnInit {

      courses: any[] = [];
      userId: string = '';
      otherUser:string="";
      enrolledCourses: string[] = []; // List of enrolled course IDs
      categories: any[] = [];
      TeacherName: any = this.auth.userName;
      students: any[] = [];
      constructor(private courseService : CourseService ,private enrollmentService:EnrollmentService ,  private categoryService: CategoryService ,public auth:AuthService,private userService: UserService) { }

      showAlert(event: MouseEvent, courseId: string): void {
        event.stopPropagation();
        console.log('showAlert triggered for courseId:', courseId); // Log the courseId being passed
        // Fetch the enrolled users first
        this.getEnrolledUsers(courseId).then(() => {
          console.log('Fetched enrolled students:', this.students); // Log the list of students

          const studentListHtml = this.students.map(student => {
            console.log('Student:', student); // Log the student object
            console.log('Student avatar URL:', student.avatarURL); // Log the student avatar URL


            return `
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <img src=${student.avatarURL} alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                  <span>${student.name}</span>
                </div>
            `;
          }).join('');

          Swal.fire({
            title: `Number of Enrolled Students: ${this.students.length}`,
            html: studentListHtml,
            confirmButtonText: 'Go Back',
            showConfirmButton: true,
            focusConfirm: false,
            width: 600
          });
        }).catch((error) => {
          console.error('Error fetching enrolled users:', error);
        });
      }

      getEnrolledUsers(courseId: string): Promise<void> {
        console.log('Fetching enrolled users for courseId:', courseId); // Log courseId before API call
        return new Promise((resolve, reject) => {
          this.enrollmentService.getEnrolledUsers(courseId).subscribe(
            (response) => {
              console.log('Response from getEnrolledUsers:', response); // Log the response from the API
              if (Array.isArray(response)) {
                this.students = response;  // Ensure the response is an array of students
                console.log('Enrolled students:', this.students); // Log the enrolled students array
                resolve();
              } else {
                console.error('Response is not an array of students:', response); // Log error if response is not an array
                reject('Invalid response format');
              }
            },
            (error) => {
              console.error('Error fetching enrolled users:', error); // Log error if API call fails
              reject(error);
            }
          );
        });
      }

      ngOnInit(): void {
        const user = this.auth.decodeToken();
        this.otherUser = user?.id;
        console.log('Decoded user:', user); 
        this.loadCategories();
        this.getCoursesByAuthor(this.TeacherName);
      }

      loadCategories(): void {
        this.categoryService.getAllCategories().subscribe((categories) => {
          this.categories = categories;  
        });
      }
      getCoursesByAuthor(author: string): void {
        this.courseService.getCourseByAuthor(author).subscribe((data) => {
          this.courses = data;
        });
      }


      addCourse() {
        const author = this.TeacherName;
        Swal.fire({
          title: 'Add New Course',
          html: `
            <input id="course-title" class="swal2-input" placeholder="Course Title" />
            <textarea id="course-description" class="swal2-input" placeholder="Course Description"></textarea>
            <input id="course-back" class="swal2-input" placeholder="Background Image URL" />
            <input id="course-logo" class="swal2-input" placeholder="Logo URL" />
            <select id="course-category" class="swal2-input">
            <option value="" disabled selected>Select Category</option>
            ${this.categories.map(category => 
              `<option value="${category.id}">${category.name}</option>`
            ).join('')}
          </select>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Add Course',
          preConfirm: () => {
            const title = (document.getElementById('course-title') as HTMLInputElement)?.value;
            const description = (document.getElementById('course-description') as HTMLTextAreaElement)?.value;
            const imageUrl = (document.getElementById('course-back') as HTMLInputElement)?.value;
            const imageLogoUrl = (document.getElementById('course-logo') as HTMLInputElement)?.value;
            const categoryId = (document.getElementById('course-category') as HTMLSelectElement)?.value;

            if (!title || title.length <2) {
              Swal.showValidationMessage('Title must be at least 2  characters long.');
              return null;
            }

            if (!description || description.length < 10) {
              Swal.showValidationMessage('Description must be at least 10 characters long.');
              return null;
            }

            if (!imageUrl || !this.isValidUrl(imageUrl)) {
              Swal.showValidationMessage('Please enter a valid URL for the background image.');
              return null;
            }

            if (!imageLogoUrl || !this.isValidUrl(imageLogoUrl)) {
              Swal.showValidationMessage('Please enter a valid URL for the logo.');
              return null;
            }
            if (!categoryId) {
              Swal.showValidationMessage('Please select a category.');
              return null;
            }
            return { title, description, author, imageUrl, imageLogoUrl, categoryId };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { title, description, author, imageUrl, imageLogoUrl, categoryId } = result.value!;
            const newCourse = { title, description, author, imageUrl, imageLogoUrl };
    
            this.courseService.createCourse(newCourse, categoryId).subscribe(
              (response) => {
                Swal.fire('Success', 'Course added successfully!', 'success');
                this.getCoursesByAuthor(this.TeacherName);
              },
              (error) => {
                Swal.fire('Error', 'Failed to add course.', 'error');
                console.error('Error adding course:', error);
              }
            );
          }
        });
      }

      deleteCourse(courseId: string,event: MouseEvent): void {
        event.stopPropagation();
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this course!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.courseService.deleteCourse(courseId).subscribe(
              () => {
                Swal.fire('Deleted!', 'The course has been deleted.', 'success');
                this.getCoursesByAuthor(this.TeacherName);
              },
              (error) => {
                Swal.fire('Error!', 'There was an issue deleting the course.', 'error');
                console.error('Error deleting course:', error);
              }
            );
          }
        });
      }

      editCourse(course: any, event: MouseEvent): void {
        event.stopPropagation();

        Swal.fire({
          title: 'Edit Course',
          html: `
            <input id="course-title" class="swal2-input" placeholder="Course Title" value="${course.title}" />
            <textarea id="course-description" class="swal2-input" placeholder="Course Description">${course.description}</textarea>
            <input id="course-back" class="swal2-input" placeholder="Background Image URL" value="${course.imageUrl}" />
            <input id="course-logo" class="swal2-input" placeholder="Logo URL" value="${course.imageLogoUrl}" />
            <select id="category-dropdown" class="swal2-input">
        <option value="" disabled>Select Category</option>
        ${this.categories.map(category => `
          <option value="${category.id}" ${category.id === course.categoryId ? 'selected' : ''}>${category.name}</option>
        `).join('')}
      </select>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Save Changes',
          preConfirm: () => {
            const title = (document.getElementById('course-title') as HTMLInputElement)?.value;
            const description = (document.getElementById('course-description') as HTMLTextAreaElement)?.value;
            const imageUrl = (document.getElementById('course-back') as HTMLInputElement)?.value;
            const imageLogoUrl = (document.getElementById('course-logo') as HTMLInputElement)?.value;
            const categoryId = (document.getElementById('category-dropdown') as HTMLSelectElement)?.value;
            if (!title || !description || !imageUrl || !imageLogoUrl) {
              Swal.showValidationMessage('Please fill in all fields');
              return null;
            }

            if (!title || title.length < 2) {
              Swal.showValidationMessage('Title must be at least 2 characters long.');
              return null;
            }

            if (!description || description.length < 10) {
              Swal.showValidationMessage('Description must be at least 10 characters long.');
              return null;
            }

            if (!imageUrl || !this.isValidUrl(imageUrl)) {
              Swal.showValidationMessage('Please enter a valid URL for the background image.');
              return null;
            }

            if (!imageLogoUrl || !this.isValidUrl(imageLogoUrl)) {
              Swal.showValidationMessage('Please enter a valid URL for the logo.');
              return null;
            }
            if (!categoryId) {
              Swal.showValidationMessage('Please select a category.');
              return null;
            }
            return this.categoryService.getCategoryById(categoryId).toPromise().then(category => {
              const updatedCourse = {
                title, 
                description, 
                imageUrl, 
                imageLogoUrl, 
                author: course.author, 
                category // Full category object
              };
      
              return updatedCourse;
            });
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const updatedCourse = result.value;
      
            // Use course.id to identify which course to update
            this.courseService.updateCourse(course.id, updatedCourse).subscribe(
              () => {
                Swal.fire('Success', 'Course updated successfully!', 'success');
                this.getCoursesByAuthor(this.TeacherName); // Refresh the courses list
              },
              (error) => {
                Swal.fire('Error', 'Failed to update course.', 'error');
                console.error('Error updating course:', error);
              }
            );
          }
        }).catch((error) => {
          Swal.fire('Error', 'An error occurred while updating the course.', 'error');
          console.error('Error:', error);
        });
      }
      isValidUrl(url: string): boolean {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
        return urlPattern.test(url);
      }
    }
