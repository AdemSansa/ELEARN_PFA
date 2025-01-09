
    import { Component, OnInit } from '@angular/core';
    import { AuthService } from 'src/app/services/auth.service';
  import { CategoryService } from 'src/app/services/category_service/category.service';
    import { CourseService } from 'src/app/services/Course_Service/course.service';
    import { EnrollmentService } from 'src/app/services/Enrollment_service/enrollment.service';
    import { UserService } from 'src/app/services/user.service';
    import Swal from 'sweetalert2';
    @Component({
        selector: 'app-add-category',
        templateUrl: './add-category.component.html',
        styleUrls: ['./add-category.component.css']
    })
    export class AddCategoryComponent  implements OnInit {

      courses: any[] = [];
      userId: string = '';
      otherUser:string="";
      enrolledCourses: string[] = []; // List of enrolled course IDs
      categories: any[] = [];
      TeacherName: any = this.auth.userName;
      students: any[] = [];
      constructor(private courseService : CourseService ,private enrollmentService:EnrollmentService ,  private categoryService: CategoryService ,public auth:AuthService,private userService: UserService) { }

      
      ngOnInit(): void {
        const user = this.auth.decodeToken();
        this.otherUser = user?.id;
        console.log('Decoded user:', user); 
        this.loadCategories();
      }

      loadCategories(): void {
        this.categoryService.getAllCategories().subscribe((categories) => {
          this.categories = categories;  
        });
      }
     


      addCategory() {
        Swal.fire({
          title: 'Add New Category',
          html: `
            <input id="course-title" class="swal2-input" placeholder="Category Title" />
            <textarea id="course-description" class="swal2-input" placeholder="Category Description"></textarea>
            <input id="course-back" class="swal2-input" placeholder="Background Image URL" />
            
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Add Category',
          preConfirm: () => {
            const name = (document.getElementById('course-title') as HTMLInputElement)?.value;
            const description = (document.getElementById('course-description') as HTMLTextAreaElement)?.value;
            const imageUrl = (document.getElementById('course-back') as HTMLInputElement)?.value;
            

            if (!name || name.length <2) {
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

            return { name, description, imageUrl };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { name, description,  imageUrl } = result.value!;
            const newCategory ={ name, description,  imageUrl};
    
            this.categoryService.createCategory(newCategory).subscribe(
              (response) => {
                this.categories.push(response);
                Swal.fire('Success', 'Course added successfully!', 'success');
              },
              (error) => {
                Swal.fire('Error', 'Failed to add course.', 'error');
                console.error('Error adding course:', error);
              }
            );
          }
        });
      }

    

      editCategory(category: any, event: MouseEvent): void {
        event.stopPropagation();
const id=category.id;
console.log(id);

        Swal.fire({
          title: 'Edit Category',
          html: `
            <input id="course-title" class="swal2-input" placeholder="Course Title" value="${category.name}" />
            <textarea id="course-description" class="swal2-input" placeholder="Course Description">${category.description}</textarea>
            <input id="course-back" class="swal2-input" placeholder="Background Image URL" value="${category.imageUrl}" />
        
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Edit Category',
          preConfirm: () => {
            const name = (document.getElementById('course-title') as HTMLInputElement)?.value;
            const description = (document.getElementById('course-description') as HTMLTextAreaElement)?.value;
            const imageUrl = (document.getElementById('course-back') as HTMLInputElement)?.value;
            
            if (!name || name.length <2) {
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

            return { name, description, imageUrl };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { name, description,  imageUrl } = result.value!;
            const newCategory ={ name, description,  imageUrl};
    
    
            this.categoryService.updateCategory(id,newCategory).subscribe(
              (response) => {
                Swal.fire('Success', 'Category added successfully!', 'success');
              },
              (error) => {
                Swal.fire('Error', 'Failed to add category.', 'error');
                console.error('Error adding category:', error);
              }
            );
          }
        });
      }
           
      isValidUrl(url: string): boolean {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
        return urlPattern.test(url);
      }
    }
