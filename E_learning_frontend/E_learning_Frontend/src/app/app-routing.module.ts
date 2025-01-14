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
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';
import { TeacherQuizComponent } from './components/teacher-quiz/teacher-quiz.component';
import { QuizComponentComponent } from './components/teacher-quiz/quiz-component/quiz-component.component';
import { EditQuizComponent } from './components/teacher-quiz/edit-quiz/edit-quiz.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component';
import { AdminGuard } from './Guards/admin.guard';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AppComponent } from './app.component';
import { studentGuard } from './Guards/student.guard';
import { teacherGuard } from './Guards/teacher.guard';
import { ChatComponent } from './components/chat/chat.component';
import { AboutComponent } from './components/about/about.component';


import { CatgoriesComponent } from './components/catgories/catgories.component';
import { AllcoursesComponent } from './components/allcourses/allcourses.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AdminCourseManagementComponent } from './components/admin-course-management/admin-course-management.component';
import { AdminCategoryManagementComponent } from './components/admin-category-management/admin-category-management.component';
import { PreferencesComponent } from './components/preferences/preferences.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'addCategory', component: AddCategoryComponent } ,

  
  { path: 'courses/:categoryId', component: CoursesComponent } ,
  { path: 'categories', component: CatgoriesComponent} ,
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'lessons/:courseId', component: LessonsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'Complete-profile', component: CompleteProfileComponent },
  { path: 'forum', component: ForumListComponent },
  { path: 'forum/:id', component: ChatListComponent },
  { path: 'avatar-selection', component: AvatarSelectionComponent },
  { path: 'quizzes', component: QuizListComponent },
  { path: 'quiz/:id', component: QuizDetailsComponent },
  { path: 'results', component: QuizResultsComponent },
  { path: 'livechat', component: ChatComponent },
    {path: 'About', component: AboutComponent },
    {path: 'AllCourses', component: AllcoursesComponent},
    { path: 'choose-preferences', component: PreferencesComponent },

  { path: 'Teachercourses', component: TeacherCoursesComponent , 
    canActivate: [teacherGuard], },
  { path: 'Teacher-quiz', component: TeacherQuizComponent , 
    canActivate: [teacherGuard],  },
  { path: 'CreateQuiz', component: QuizComponentComponent , 
    canActivate: [teacherGuard], },

  { path: 'edit-quiz/:id', component: EditQuizComponent , 
    canActivate: [teacherGuard],  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'users', component: AdminUserManagementComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'courses', component: AdminCourseManagementComponent},
      { path: 'categories', component: AdminCategoryManagementComponent}

    ],
    canActivate: [AdminGuard], 
  },
  
{ path: 'MyCourses', component: UserCoursesComponent, 
    canActivate: [studentGuard], 
  },
 
  { path: '**', redirectTo: 'home' }

];

 // Route for lessons




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
