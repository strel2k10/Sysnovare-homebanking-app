import { Component } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 

})
export class HeaderComponent {
  isUserLoggedIn: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {
    this.isUserLoggedIn = this.authService.isAuthenticatedUser();
    this.authService.authChanged.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
    });
  }

  // Method to handle the logout action
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isUserLoggedIn = false;
  }

  // Method to check if the current route is '/login'
  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  // Method to check if the current route is '/register'
  isRegistrationRoute(): boolean {
    return this.router.url === '/register';
  }
}
