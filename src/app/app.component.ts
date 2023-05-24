import { AuthService } from './auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor (public AuthService : AuthService) {}
  ngOnInit(): void {
    this.AuthService.authUserLocally();
    console.log("from app.component.ts. token : ", this.AuthService.getToken());
    console.log("from app.component.ts. authStatus : ", this.AuthService.getisAuth());
  }
}
