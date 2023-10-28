// main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { environment } from './app/environments/environment';
import { generateUniqueUserId } from './app/user-utils'; // Import the function to generate a unique user ID

if (environment.production) {
  enableProdMode();
}

// Initialize user data in local storage
const users = JSON.parse(localStorage.getItem('users') || '[]');
if (users.length === 0) {
  console.log('Initializing users with test data.');

  // If there are no users in local storage, initialize with test users
  const initialUsers = [
    {
      userId: generateUniqueUserId(),
      username: 'test',
      password: 'test',
      totalBalance: 1000,
      userTransactions: [
        {
          date: '2023-10-30T08:00:00.000Z',
          type: 'Deposit',
          amount: 100,
        },
      ],
    },
    {
      userId: generateUniqueUserId(),
      username: 'user2',
      password: 'password2',
      totalBalance: 1500,
      userTransactions: [
        {
          date: '2023-10-30T08:00:00.000Z',
          type: 'Withdrawal',
          amount: 400,
        },
      ],
    },
  ];
  localStorage.setItem('users', JSON.stringify(initialUsers));
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
