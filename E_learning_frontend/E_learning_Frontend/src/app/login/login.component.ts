import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { Validators,FormGroup, FormBuilder} from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,private router: Router,    private route: ActivatedRoute,
    private fb: FormBuilder) {}
  authForm! :FormGroup;


  credentials = { email: ''
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


 

  ngOnInit(): void {
    
    google.accounts.id.initialize({
      client_id: '564318137355-aa2ut1tinklepfman8n40uma9ud4vnca.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response),
      hl: 'en'
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350,
      }
    );
  }






private decode(token:string){
  return JSON.parse(atob(token.split(".")[1]));
}


  handleGoogleLogin(response: any): void {
    if (response && response.credential) {
      const payload = this.decode(response.credential);
      console.log('Google Sign-In payload:', payload);

      this.authService.googleLogin(response.credential).subscribe(
        (res) => {
          console.log('Backend response:', res);
          sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
          this.router.navigate(['home']);
          this.showAlert();
        },
        (err) => {
          console.error('Error backend auth', err);
          this.showAlertError(err.message || 'Unknown error'); 
        }
      );
    }
  }



  onSubmit() {
    this.authService.login(this.email,this.password).subscribe({
      next: (response) => {
        const { role } = response;
        localStorage.setItem('Role', role);
        console.log(role);
        if (role[0] === 'ROLE_ADMIN') {
          this.router.navigate(['/Admin']);
        } else if (role[0] === 'ROLE_USER') {
          this.router.navigate(['/home']);
          this.showAlert();
        } else {
          console.error('Unknown role:', role);
           this.showAlertError('Unknown role');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
    this.showAlertError(err.error.message || 'Login failed');
      },
    });
  }

  async showAlert() {
    await Swal.fire({
      title: 'Welcome!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async showAlertError(errorMessage: string) {
    await Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      showConfirmButton: true,
      timer: 1500,
    });
  }
}
