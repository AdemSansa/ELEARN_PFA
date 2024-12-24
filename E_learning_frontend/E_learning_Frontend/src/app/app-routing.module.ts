import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';

import { TeacherCoursesComponent } from './components/courses/teacher-courses/teacher-courses.component';

import { LessonsComponent } from './components/lessons/lessons.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { AvatarSelectionComponent } from './components/avatar-selection/avatar-selection.component';



const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full' }, 
{path: 'login', component: LoginComponent },
{path: 'register', component: SignupComponent },
{path: 'home', component: HomeComponent }, 
{path: 'reset-password', component: ResetPasswordComponent }, 
{path : 'Admin', component :UserListComponent} ,
{path :"courses",component: CoursesComponent},
{path :"Teachercourses",component: TeacherCoursesComponent},
{path :"MyCourses",component: UserCoursesComponent},
{path: 'lessons/:courseId', component: LessonsComponent },
{path: 'profile',component:ProfileComponent },
{path: 'Complete-profile', component: CompleteProfileComponent },
{path: 'forum', component: ForumListComponent },
{ path: 'forum/:id', component: ChatListComponent },
{ path: 'avatar-selection', component: AvatarSelectionComponent },





 // Route for lessons

]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
