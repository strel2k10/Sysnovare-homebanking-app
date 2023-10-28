import { Component } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    // Perform the logout logic
    authService.logout();

    // Show a pop-up message
    this._snackBar.open('You have been successfully logged out', 'Close', {
      duration: 3000, // Message duration (in milliseconds)
    });
  }
}
