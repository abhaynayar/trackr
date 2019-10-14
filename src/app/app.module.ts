import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { HeaderComponent } from './header/header.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionCreateComponent,
    HeaderComponent,
    MyBarChartComponent,
    MyLineChartComponent
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
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
