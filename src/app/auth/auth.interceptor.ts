import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(public AuthService : AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const token = this.AuthService.getToken();
    const reqManipulated = req.clone({
      headers : req.headers.set('Authorization', "Bearer " + token)
    })
    return next.handle(reqManipulated);
  };
};
