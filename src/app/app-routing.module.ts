import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { TransactionMonthComponent } from './transactions/transaction-month/transaction-month.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: TransactionListComponent, canActivate: [AuthGuard] },
  { path: 'month', component: TransactionMonthComponent, canActivate: [AuthGuard] },
  { path: 'create', component: TransactionCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:transactionId', component: TransactionCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
