import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'list', component: TransactionListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: TransactionCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:transactionId', component: TransactionCreateComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: MyBarChartComponent },
/*
  { path: 'bar-chart', component: MyBarChartComponent },
  { path: 'line-chart', component: MyLineChartComponent },
  { path: '**', component: MyLineChartComponent },
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
