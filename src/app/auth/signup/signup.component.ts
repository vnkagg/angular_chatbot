import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public authService : AuthService) {};
  isLoading = false;
  onSignup(form : NgForm){
    console.log("Raw form data : ", form.value);
    this.authService.createUser(form.value.email, form.value.password)
  }
}
