import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated = false;
  private authChangedSubject = new Subject<boolean>();
  private authenticatedUserId: string = '';

  constructor(private router: Router) {
    this.isAuthenticated = this.loadAuthenticationStatus();
  }

  login(username: string, password: string, userId: string): boolean {
    // Perform user authentication logic here based on username, password, and userId
    if (this.checkUserCredentials(username, password, userId)) {
      this.isAuthenticated = true;
      this.authenticatedUserId = userId; // Set the authenticated user's ID
      this.saveAuthenticationStatus(this.isAuthenticated);
      this.authChangedSubject.next(this.isAuthenticated);

      return true; // Successful login
    } else {
      this.isAuthenticated = false;
      this.authenticatedUserId = '';
      this.saveAuthenticationStatus(this.isAuthenticated);
      this.authChangedSubject.next(this.isAuthenticated); // Emit the change

      return false; // Login failed
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authenticatedUserId = '';
    this.saveAuthenticationStatus(this.isAuthenticated);
    this.authChangedSubject.next(this.isAuthenticated);
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getAuthenticatedUserId(): string {
    return this.authenticatedUserId;
  }

  private checkUserCredentials(
    username: string,
    password: string,
    userId: string
  ): boolean {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (Array.isArray(storedUsers)) {
      const user = storedUsers.find(
        (u: any) => u.username === username && u.password === password
      );
      return user ? user.userId === userId : false;
    }

    return false;
  }

  private saveAuthenticationStatus(status: boolean): void {
    localStorage.setItem('authenticated', status.toString());
  }

  private loadAuthenticationStatus(): boolean {
    return !!localStorage.getItem('authenticated');
  }

  get authChanged() {
    return this.authChangedSubject.asObservable();
  }
}
