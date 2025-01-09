import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
  closeDialog() {
    // Close the dialog

    
  }
}
