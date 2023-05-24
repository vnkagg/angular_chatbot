import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector : 'header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor ( public AuthService : AuthService) {};
  private token : string = '';
  public status : boolean = false;
  public authStatusSubs!: Subscription;
  ngOnInit(): void {
    console.log("header");
    this.status = this.AuthService.getisAuth();
    console.log("this.status", this.status);
    console.log("getisAuth", this.AuthService.getisAuth());
    this.authStatusSubs = this.AuthService.isAuth().subscribe(isAuthenticated => {
      this.status = isAuthenticated;
    });
  }
  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe();
  }
  logout(){
    this.token = '';
    this.status = false;
    this.AuthService.logout();
  }
}
