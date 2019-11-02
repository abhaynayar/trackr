import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinner,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatPaginator,
  MatDialog,
  MatDialogModule,
  MatBottomSheetModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionsService } from './transactions/transactions.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TransactionMonthComponent } from './transactions/transaction-month/transaction-month.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransactionCreateComponent,
    HeaderComponent,
    FooterComponent,
    MyBarChartComponent,
    MyLineChartComponent,
    TransactionListComponent,
    TransactionMonthComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    ChartsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBottomSheetModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
