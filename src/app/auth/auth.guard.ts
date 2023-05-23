import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private AuthService : AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.AuthService.authStatus) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
