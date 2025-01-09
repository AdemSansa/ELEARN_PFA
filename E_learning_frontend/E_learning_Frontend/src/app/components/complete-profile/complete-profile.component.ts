import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent  implements OnInit {
  
  profileData = {
    id: '',
    name:'',
    email: '',
    PhoneNumber:'',
    
    adress: '',
    city:'',
    country:'' ,
    birthDate: '',
    phoneNumber: '',
    facebookURL: '',
    githubURL:'',
    linkedinURL: '',
    twitterURL: '',
    instagramURL:'',

  };

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<CompleteProfileComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any ) {}
 
      ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (response) => {
        console.log('User info:', response);
        this.profileData = response;
        console.log('Profile data:', this.profileData);
        
      },
      (error) => {
        console.error('Error getting user info:', error); 

      });

  }


      
  onSubmit(profileForm: any): void {
    if (profileForm.valid) {
      const token = this.authService.decodeToken();
      // get user Id
      const userId = token?.id;
      this.profileData.id = userId;
      console.log('Profile data:', this.profileData);
      

      this.authService.completeProfile(this.profileData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          Swal.fire('Success', 'Profile updated successfully', 'success');
          this.dialogRef.close(response);

        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('An error occurred while updating the profile.');
        }
      );
    }
  }
}
