import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginFailed = false;
  isUserLoggedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {
    this.isUserLoggedIn = this.authService.isAuthenticatedUser();
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    const { username, password } = this.formLogin.value;

    if (this.isUserLoggedIn) {
      this.logout();
    } else {
      const userId = this.userService.getUserIdByUsername(username);

      if (userId) {
        if (this.authService.login(username, password, userId)) {
          this.loginFailed = false;
          this.router.navigate(['/']);
          this.userService.setUsername(username);
          this.userService.setUserId(userId); // Set userId only if it's valid

          this.isUserLoggedIn = true;

          this._snackBar.open('Login successful', 'Close', {
            duration: 3000,
          });
        } else {
          this.loginFailed = true;
          this._snackBar.open(
            'Login failed. Please check your username and password.',
            'Close',
            {
              duration: 3000,
            }
          );
        }
      } else {
        this.loginFailed = true;
        this._snackBar.open(
          'User not found. Please check your username.',
          'Close',
          {
            duration: 3000,
          }
        );
      }
    }
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
    this._snackBar.open('You have been successfully logged out', 'Close', {
      duration: 3000,
    });
  }
}
