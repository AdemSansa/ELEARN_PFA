import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];

      if (code) {
        console.log('GitHub OAuth code:', code);

        this.authService.githubLogin(code).subscribe(
          (response) => {
            console.log('GitHub login successful:', response);

            sessionStorage.setItem('loggedInUser', JSON.stringify(response));

            this.router.navigate(['home']);
          },
          (error) => {
            console.error('GitHub login failed:', error);
            this.router.navigate(['login']); 
          }
        );
      } else {
        console.error('GitHub OAuth code is missing');
        this.router.navigate(['login']); 
      }
    });
  }
}
