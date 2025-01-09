import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryScale } from 'chart.js';
import { CategoryService } from 'src/app/services/category_service/category.service';
import { ViewCategoryComponent } from '../view-category/view-category.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-category-management',
  templateUrl: './admin-category-management.component.html',
  styleUrls: ['./admin-category-management.component.css']
})
export class AdminCategoryManagementComponent implements OnInit {


  categories: any[] = [];
  searchText: string = '';
  
      User:any;
      constructor(private http: HttpClient,private cdr: ChangeDetectorRef, private dialog: MatDialog,private categoryService : CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
    


  viewCategory(categoryId: string): void {
    const category = this.categories.find(c => c._id === categoryId);
    if (category) {
      this.dialog.open(ViewCategoryComponent, {
        data: category,  // Pass the entire category object
      });
    }
}
deleteCategory(categoryId: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      
    
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        // Update the local category list
        this.categories = this.categories.filter((c) => c._id !== categoryId);
        this.cdr.detectChanges();
      });
    }
  });


}
}
