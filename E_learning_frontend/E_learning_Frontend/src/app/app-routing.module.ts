import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
{ path: 'login', component: LoginComponent },
{ path: 'register', component: SignupComponent },


{ path: 'home', component: HomeComponent }, 
{ path : 'Admin', component :UserListComponent} ]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
