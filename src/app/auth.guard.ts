// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      route.url[0].path === 'register' &&
      !this.authService.isAuthenticatedUser()
    ) {
      return true; // Allow access to the registration route for unauthenticated users
    } else if (this.authService.isAuthenticatedUser()) {
      return true; // Allow access to other routes for authenticated users
    } else {
      // Redirect to the login page or another unauthorized page
      this.router.navigate(['/login']);
      return false; // Deny access to the route for unauthenticated users
    }
  }
}
