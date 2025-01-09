import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category_service/category.service';

@Component({
  selector: 'app-catgories',
  templateUrl: './catgories.component.html',
  styleUrls: ['./catgories.component.css']
})
export class CatgoriesComponent 
implements OnInit {
  categories: any[] = []; 

  constructor(
    private categoryService: CategoryService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  navigateToCourses(categoryId: string): void {
    this.router.navigate(['/courses', categoryId]);
  }
  addCategory (Category: any) {  
    this.categoryService.createCategory(Category).subscribe((data) => {
      console.log(data);
    });
    
  
  } 
  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe((data) => {
      console.log(data);
    });
  }
  updateCategory(categoryId: string, category: any) {
    this.categoryService.updateCategory(categoryId, category).subscribe((data) => {
      console.log(data);
    });
  } 
}