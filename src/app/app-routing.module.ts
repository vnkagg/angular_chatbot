import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { InputComponent } from './inputs/input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path : '', component : PostListComponent },
  { path : 'create', component : InputComponent, canActivate : [AuthGuard] },
  { path : 'edit/:postID', component : InputComponent, canActivate : [AuthGuard]},
  { path : 'login', component : LoginComponent},
  { path : 'signup', component : SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
