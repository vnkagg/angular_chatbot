import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.AuthService.isAuth().subscribe(
      () => {
        this.isLoading = false;
      }
    );
  }
  constructor ( public AuthService : AuthService) {}
  isLoading = false;
  onLogin(form : NgForm){
    // console.log(form.value);
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.AuthService.login(form.value.email, form.value.password);
  }
}
