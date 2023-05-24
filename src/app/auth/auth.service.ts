import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';

@Injectable({ providedIn : 'root' })
export class AuthService{
  public userCreds : string = '';
  public userid : string = '';
  private token : string = '' ;
  public authStatus = new Subject<boolean>();
  public creds = new Subject<[email : string, userid : string]>();
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
  getCreds(){
    return [this.userCreds, this.userid];
  }
  getCredsobs(){
    return this.creds.asObservable();
  }
  constructor (public http : HttpClient, private Router : Router) {};
  createUser(email : string, password : string){
    const creds : AuthData = {
      email : email,
      password : password
    }
    this.http.post<{message : string}>('http://localhost:8080/api/user/signup', creds)
      .subscribe(() => {
        // console.log("response message : ", response.message);
        this.Router.navigate(['/']);
      }, err => {
        console.log("subscribe error in signup : ", err);
        this.authStatus.next(false);
      });
  };
  login(email : string, password : string){
    const creds : AuthData = {
      email : email,
      password : password
    }
    this.http.post<{token : string, userid: string}>('http://localhost:8080/api/user/login', creds)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.userid = response.userid;
        if(token){
          this.statusAuth = true;
          this.authStatus.next(true);
          this.userCreds = email;
          this.creds.next([email, this.userid]);
          this.storeAuthLocal(this.token);
          this.Router.navigate(['/']);
        }
      }, error => {
        this.authStatus.next(false);
        console.log("login error : ", error);
      });
  };
  logout(){
    this.token = '';
    this.statusAuth = false;
    this.authStatus.next(false);
    this.userCreds = '';
    this.creds.next(['', '']);
    this.clearAuthLocal();
    this.Router.navigate(['/']);
  }
  private storeAuthLocal(token : string){
    localStorage.setItem('token', token);
  }
  private clearAuthLocal(){
    localStorage.removeItem("token");
  }
  authUserLocally(){
    this.token = this.getAuthData();
    if(this.token !== '' ){
      this.statusAuth = true;
      this.http.get<{email : string, id : string}>('http://localhost:8080/auth/local').subscribe(response => {
        this.userid = response.id;
        this.userCreds = response.email;
        this.creds.next([this.userCreds, this.userid]);
      });
      // push the user credentials code here to display the username
    }
    this.authStatus.next(this.statusAuth);
  }
  getAuthData(){
    const token = localStorage.getItem("token");
    if(token){
      return token;
    } else{ return ''; };
  }
};
