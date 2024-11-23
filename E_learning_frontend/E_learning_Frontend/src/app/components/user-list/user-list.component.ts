import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],

})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
  deleteUser(id: String): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {



   // Optimistically update the UI
   const previousUsers = [...this.users]; // Save current state for potential rollback
   this.users = this.users.filter(user => user.id !== id);
 
   // Call the API to delete the user in the database
   this.userService.deleteUser(id).subscribe({
    
     next: () => {
       console.log('User deleted successfully from the database.');
     },
     error: (error) => {
       console.error('Error deleting user:', error);
       alert('Failed to delete user.');
       // Rollback the UI if deletion fails
       this.users = previousUsers;
     }
   });
  }
}
    );
  }
}



