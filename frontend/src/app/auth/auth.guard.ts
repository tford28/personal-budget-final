import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: any = {};
  userType: any = {};
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.user = localStorage.getItem('JWT_Token');
    if (this.user != 'guest') {
      this.user = jwt_decode(this.user);
      console.log(this.user.userType);
      this.userType = this.user.userType;
    } else this.userType = 'guest';

    if (this.userType == 'admin') {
      return true;
    } else if (this.userType == 'normal') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}