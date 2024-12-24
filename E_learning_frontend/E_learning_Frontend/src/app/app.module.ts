import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';

import { TeacherCoursesComponent } from './components/courses/teacher-courses/teacher-courses.component';

import { LessonsComponent } from './components/lessons/lessons.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { AvatarSelectionComponent } from './components/avatar-selection/avatar-selection.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,

    HomeComponent,
    UserListComponent,
    UserFormComponent,
    ResetPasswordComponent,
    CoursesComponent,
    UserCoursesComponent,
    TeacherCoursesComponent,
    LessonsComponent,
    ProfileComponent,
    CompleteProfileComponent,
    ForumListComponent,
    ChatListComponent,
    AvatarSelectionComponent,
   
    

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
