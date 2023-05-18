import { InputComponent } from './inputs/input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path : '', component : PostListComponent },
  { path : 'create', component : InputComponent },
  { path : 'edit/:postID', component : InputComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
