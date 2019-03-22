import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authentication: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

   if (localStorage.getItem('userToken') != null) {
        let roles = next.data['roles'] as Array<string>;
        if (roles) {

          let match = this.authentication.roleMatch(roles);

          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }

        } else {
          return true;
        }
      }
      this.router.navigate(['/login']);
return false;
}
}
