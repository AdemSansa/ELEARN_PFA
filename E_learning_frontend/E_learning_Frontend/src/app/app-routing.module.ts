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
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full' }, 
{path: 'homee', component: AppComponent },
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
{ path: 'quizzes', component: QuizListComponent},
{path: 'quiz/:id', component: QuizDetailsComponent},
{ path: 'results', component: QuizResultsComponent },

{ path: 'Teacher-quiz', component: TeacherQuizComponent },
{path: 'CreateQuiz', component: QuizComponentComponent },

{ path: 'edit-quiz/:id', component: EditQuizComponent },
{ path: 'livechat', component: ChatComponent },

{
  path: 'admin',
  component: AdminDashboardComponent,
  children: [
    { path: 'users', component: AdminUserManagementComponent },
    {path:'statistics', component: StatisticsComponent}
  ],
  canActivate: [AdminGuard], // Protect the route
},
];

 // Route for lessons




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
