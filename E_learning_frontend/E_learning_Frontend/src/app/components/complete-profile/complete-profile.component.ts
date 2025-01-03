import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent {
  profileData = {
    id: '',
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

  constructor(private authService: AuthService) {}

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
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('An error occurred while updating the profile.');
        }
      );
    }
  }
}
