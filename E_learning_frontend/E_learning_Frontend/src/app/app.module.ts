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


import { NgChartsModule } from 'ng2-charts';

import { TeacherCoursesComponent } from './components/courses/teacher-courses/teacher-courses.component';

import { LessonsComponent } from './components/lessons/lessons.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { AvatarSelectionComponent } from './components/avatar-selection/avatar-selection.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';
import { TeacherQuizComponent } from './components/teacher-quiz/teacher-quiz.component';
import { QuizComponentComponent } from './components/teacher-quiz/quiz-component/quiz-component.component';
import { EditQuizComponent } from './components/teacher-quiz/edit-quiz/edit-quiz.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component';
import { JoinRolesPipe } from './join-roles.pipe';
import { FilterUsersPipe } from './filter-users.pipe';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { RoleManagementDialogComponent } from './components/role-management/role-management.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChatComponent } from './components/chat/chat.component';
import { AboutComponent } from './components/about/about.component';

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
    QuizListComponent,
    QuizDetailsComponent,
    QuizResultsComponent,
    TeacherQuizComponent,
    QuizComponentComponent,
    EditQuizComponent,
    AdminDashboardComponent,
    AdminUserManagementComponent,
    JoinRolesPipe,
    FilterUsersPipe,
    EditUserComponent,
    ViewUserComponent,
    RoleManagementDialogComponent,
    RoleManagementDialogComponent,
    StatisticsComponent,
    ChatComponent,
    AboutComponent,
    
   
    
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // Place FormsModule and ReactiveFormsModule early
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule, // Include this after ensuring Material dependencies
    NgChartsModule,
    
    
    ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
