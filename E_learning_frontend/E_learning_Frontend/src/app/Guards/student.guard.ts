import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authS = inject(AuthService);
  if(authS.isStudent()){
    return true;
  } else {
    router.navigate(['/home'], { replaceUrl: true }); 
        return false;
  }
};