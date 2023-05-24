import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user : string = '';
  constructor(public AuthService : AuthService){}
  ngOnInit(): void {
    this.user = this.AuthService.getCreds()[0];
    this.AuthService.getCredsobs().subscribe(user => {this.user = user[0]});
    console.log("user", this.user);
  }
}
