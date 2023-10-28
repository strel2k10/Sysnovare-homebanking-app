// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string = '';
  private userId: string = '';
  private currentUserId: string;
  private transactions: Array<any> = [];

  constructor() {
    this.currentUserId = '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setUserId(userId: string) {
    this.currentUserId = userId;
  }

  getUserId() {
    return this.currentUserId;
  }


  setTransactions(transactions: Array<any>) {
    this.transactions = transactions;
  }

 
  getTransactions(): Array<any> {
    return this.transactions;
  }

  getUserIdByUsername(username: string): string | undefined {
    // Retrieve stored users from localStorage
    const usersString = localStorage.getItem('users');
    if (usersString) {
      const users = JSON.parse(usersString);

      // Find a matching user
      const user = users.find((u: any) => u.username === username);

      if (user) {
        return user.userId;
      }
    }

    // If the user is not found, return undefined
    return undefined;
  }
}
