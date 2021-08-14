import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private service:UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (!this.service.isLoggedIn()) {
        this.router.navigateByUrl('/home');
        this.service.deleteToken();
        return false;
      }
    return true;
  }
}