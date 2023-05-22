import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';

@Injectable({ providedIn : 'root' })
export class AuthService{
  private token : string = '';
  public authStatus = new Subject<boolean>();
  public statusAuth : boolean = false;
  getToken(){
    return this.token;
  }
  isAuth(){
    return this.authStatus.asObservable();
  }
  getisAuth(){
    return this.statusAuth;
  }
  constructor (public http : HttpClient, private Router : Router) {};
  createUser(email : string, password : string){
    const creds : AuthData = {
      email : email,
      password : password
    }
    this.http.post<{message : string}>('http://localhost:8080/api/user/signup', creds)
      .subscribe(response => {
        console.log("response message : ", response.message);
        this.Router.navigate(['/']);
      });
  };
  login(email : string, password : string){
    const creds : AuthData = {
      email : email,
      password : password
    }
    this.http.post<{token : string}>('http://localhost:8080/api/user/login', creds)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          this.statusAuth = true;
          this.authStatus.next(true);
          this.Router.navigate(['/']);
        }
      });
  };
  logout(){
    this.token = '';
    this.statusAuth = false;
    this.authStatus.next(false);
    this.Router.navigate(['/']);
  }
};
