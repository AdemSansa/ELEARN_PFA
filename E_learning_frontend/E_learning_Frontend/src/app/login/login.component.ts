import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Validators,FormGroup, FormBuilder} from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm! :FormGroup;


  credentials = { email: '' // Email validation
, password:''}  

StrongPass(Pass : string)
{
  if(Pass.length < 8)
  {
    return "Password must be at least 8 characters long";
  }

  let hasUpperCase = /[A-Z]/.test(Pass);
  let hasLowerCase = /[a-z]/.test(Pass);
  let hasNumeric = /[0-9]/.test(Pass);
  let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(Pass);
  if (!hasUpperCase) {
    let test1 = true;
    return "1";
    
    
  }
  if (!hasLowerCase) {
    let test2 = true

   return '2';
    
  }
  if (!hasNumeric) {
    let test3 = true
    return  '3';

  }
  return null




}
    
   // Custom Validator for Password
   strongPasswordValidator(control: any) {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !isValid ? { strongPassword: true } : null;
  }

  email: string = '';
  password: string = '';
  constructor(private authService: AuthService,private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    
    google.accounts.id.initialize({
      client_id: '564318137355-aa2ut1tinklepfman8n40uma9ud4vnca.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      }
    );
    
  }





private decode(token:string){
  return JSON.parse(atob(token.split(".")[1]));
}



handleLogin(response:any){
  if (response && response.credential) {
    const payload = this.decode(response.credential);
    console.log('Google Sign-In payload:', payload);
    this.authService.googleLogin(response.credential).subscribe(
      (res) => {
        console.log('Backend response:', res);
        sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
        this.router.navigate(['home']);
      },
      (err) => {
        console.error('Error backend auth', err);
      }
    );
  }
}



signInWithGitHub() {
  const clientId = 'Ov23liEXvDDjB5IcNyQ4';
  const redirectUri = 'http://localhost:4200/callback';
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
}

  onSubmit() {
    this.authService.login(this.email,this.password).subscribe({
      next: (response) => {
        const { role } = response;

        // Store user data if needed
        localStorage.setItem('Role', role);
        console.log(role);
        
        // Redirect based on role
        if (role[0] === 'ROLE_ADMIN') {
          this.router.navigate(['/Admin']);
        } else if (role[0] === 'ROLE_USER') {
          this.router.navigate(['/home']);
        } else {
          console.error('Unknown role:', role);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    });
  }
}
