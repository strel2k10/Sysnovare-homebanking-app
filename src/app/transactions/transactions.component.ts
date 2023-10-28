import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Array<any> = [];
  newTransactionAmount: number = 0;
  selectedTransactionType: 'Deposit' | 'Withdrawal' = 'Deposit';
  userBalance!: number; // Use the "Definite Assignment Assertion" here

  constructor(private userService: UserService) {
    this.userBalance = parseFloat(
      localStorage.getItem('userBalance') || '1000'
    );
  }

  ngOnInit() {
    const userId = this.userService.getUserId();
    const usersString = localStorage.getItem('users');

    if (usersString) {
      const users = JSON.parse(usersString);
      const user = users.find((u: any) => u.userId === userId);

      if (user) {
        this.transactions = user.userTransactions || [];
        this.userBalance = user.totalBalance; // Update the userBalance when available
      }
    }
  }

  saveUserBalance() {
    localStorage.setItem('userBalance', this.userBalance.toString());
  }
  makeTransaction() {
    const userId = this.userService.getUserId();

    if (this.newTransactionAmount !== 0) {
      const transactionType = this.selectedTransactionType;
      const transactionAmount =
        transactionType === 'Deposit'
          ? this.newTransactionAmount
          : -this.newTransactionAmount;

      const userId = this.userService.getUserId();

      const usersString = localStorage.getItem('users');
      const users = usersString ? JSON.parse(usersString) : [];

      const user = users.find((u: any) => u.userId === userId);

      if (user) {
        user.totalBalance += transactionAmount;

        const transaction = {
          date: new Date(),
          type: transactionType,
          amount: transactionAmount,
        };

        user.userTransactions = user.userTransactions || [];
        user.userTransactions.push(transaction);

        const userIndex = users.indexOf(user);
        users[userIndex] = user;

        localStorage.setItem('users', JSON.stringify(users));

        this.userBalance = user.totalBalance;
        this.transactions = user.userTransactions;

        this.newTransactionAmount = 0;
        this.saveUserBalance();
      } else {
        console.log('User not found');
      }
    }
  }
}
