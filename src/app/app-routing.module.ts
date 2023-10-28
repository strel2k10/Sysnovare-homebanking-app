import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to the registration route
    data: { page: 'register' }, // Add this data to specify the page
  },
  { path: 'login', component: LoginComponent, data: { page: 'login' } },
  { path: 'logout', component: LogoutComponent },
  { path: 'transactions', component: TransactionsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
