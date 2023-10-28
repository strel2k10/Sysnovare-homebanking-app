import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { generateUniqueUserId } from '../user-utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.formRegister = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  register() {
    const user = this.formRegister.value;

    // Generate a unique user ID during registration
    const userId = generateUniqueUserId();

    // Retrieve the existing list of users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Create a new user object
    const newUser = {
      userId: userId,
      username: user.username,
      password: user.password,
      totalBalance: 1000,
      userTransactions: [],
    };

    // Add the new user to the existing list of users
    existingUsers.push(newUser);

 

    // Update the "users" key in local storage with the updated user list
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Show a popup message for successful registration
    this._snackBar.open(
      `Registration successful, welcome ${user.username}!`,
      'Close',
      {
        duration: 3000,
      }
    );
  }
}
