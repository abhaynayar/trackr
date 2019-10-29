import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { HeaderComponent } from './header/header.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionsService } from './transactions/transactions.service';

@NgModule({
  declarations: [
    AppComponent,
    TransactionCreateComponent,
    HeaderComponent,
    MyBarChartComponent,
    MyLineChartComponent,
    TransactionListComponent
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
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
