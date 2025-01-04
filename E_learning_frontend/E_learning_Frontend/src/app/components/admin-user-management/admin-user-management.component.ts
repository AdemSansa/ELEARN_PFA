import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';
import { UserService } from 'src/app/services/user.service';
import { RoleManagementDialogComponent } from '../role-management/role-management.component';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {
  users: any[] = [];
  baseUrl = 'http://localhost:8081';
  User:any;
  constructor(private http: HttpClient,private cdr: ChangeDetectorRef, private dialog: MatDialog,private userService:UserService) {}

  ngOnInit(): void {
    this.http.get(`${this.baseUrl}/Admin/users`).subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
      
    });
  }


  banUser(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to ban this user.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, ban them!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(`${this.baseUrl}/Admin/ban/${userId}`, {}).subscribe(() => {
          // Update the user in the local list (e.g., add a "banned" flag)
          this.cdr.detectChanges(); // Notify Angular about changes

          // delete from list of users 
          const user = this.users.find((u) => u.id === userId);
          if (user) {
            user.roles = [];
            user.Isbanned = true // Assuming the API marks the user as banned
          }
          Swal.fire('Banned!', 'The user has been banned.', 'success');
        });
      }
    });
  }

  
  deleteUser(userId: string): void {
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
        this.http.delete(`${this.baseUrl}/Admin/delete/${userId}`).subscribe(() => {
          // Remove the user from the local list
          this.users = this.users.filter((u) => u.id !== userId);
          this.cdr.detectChanges(); // Notify Angular about changes

          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        });
      }
    });
  } 

 
  searchText: string = '';

  // Method to map roles to flag classes
  getFlagClass(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'ADMIN'; // For the US flag
      case 'ROLE_USER':
        return 'USER'; // For the UK flag
      case 'ROLE_TEACHER':
        return 'TEACHER'; // For the France flag
      // Add more roles here as needed
      default:
        return 'unknown'; // Default if no flag exists
    }
  }

viewUser(userId: string): void {
  this.userService.getUserByID(userId).subscribe((data) => {
    this.User = data;
    console.log(this.User);
    if (this.User) {
      this.dialog.open(ViewUserComponent, {
        data: this.User,
        width: '400px',
      });
    }
    
  }
);

  
}

editUser(userId: string): void {
  const user = this.users.find((u) => u.id === userId);
  if (user) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { ...user },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        this.http.put(`${this.baseUrl}/Admin/edit/${userId}`, updatedUser).subscribe(() => {
          // Update the local user list
          const index = this.users.findIndex((u) => u.id === userId);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        });
      }
    });
  }
}  
manageRoles(user: any) {
  const dialogRef = this.dialog.open(RoleManagementDialogComponent, {
    data: { ...user },
  });

  dialogRef.afterClosed().subscribe((updatedRoles) => {
    if (updatedRoles) {
      
    }
  });
}
openRoleDialog(user: any) {
  const dialogRef = this.dialog.open(RoleManagementDialogComponent, {
    width: '400px', // Adjust width for better visibility
    data: { roles: user.roles },
  });

  dialogRef.afterClosed().subscribe((selectedRoles) => {
    if (selectedRoles) {
      user.roles = selectedRoles; // Update user roles in your data source
      this.userService.updateUserRoles(user.id, selectedRoles).subscribe(() => {
        user.roles  = selectedRoles; // Update roles in the UI
      }); // Example method to update roles in the backend
    }
  });
}


}