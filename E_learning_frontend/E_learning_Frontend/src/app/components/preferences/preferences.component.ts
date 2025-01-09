import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  categories = ['Science', 'programming', 'Design', 'Health', 'languages'];
  selectedPreferences: any = {};

  constructor(private auth:AuthService, private router: Router) {}

  savePreferences() {
      const preferences = Object.keys(this.selectedPreferences).filter(category => this.selectedPreferences[category]);

      
  
      const userId = this.auth.decodeToken().id;  // Replace with the actual userId dynamically
    
    // Assuming you have a service method that handles the request to save preferences
    this.auth.updatePreferences(preferences,userId).subscribe(response => {
      console.log('Preferences updated successfully');
      // Redirect to the next page or dashboard after saving preferences
      this.router.navigate(['/home']);
      
    });
    this.router.navigate(['/home']);
  }
}
