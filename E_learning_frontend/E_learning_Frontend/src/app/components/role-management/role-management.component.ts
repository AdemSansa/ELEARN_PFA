import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementDialogComponent {
  availableRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_TEACHER']; // Define roles
  selectedRoles: string[] = []; // Array to track selected roles

  constructor(
    public dialogRef: MatDialogRef<RoleManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Prepopulate selected roles if editing an existing user
    this.selectedRoles = data.roles ? [...data.roles] : [];
  }

  saveRoles() {
    this.dialogRef.close(this.selectedRoles); // Pass selected roles back to the parent component
  }
}