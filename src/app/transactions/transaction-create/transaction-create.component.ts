import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { MyLineChartComponent } from 'src/app/my-line-chart/my-line-chart.component';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent {

  foods: Food[] = [
    { value: 'food', viewValue: 'Food' },
    { value: 'travel', viewValue: 'Travel' },
    { value: 'laundry', viewValue: 'Laundry' }
  ];

  enteredType = '';
  enteredAmount = '';

  constructor(public transactionsService: TransactionsService) {}

  onTransactionCreate(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.transactionsService.addTransaction(form.value.enteredType, form.value.enteredAmount);
    form.resetForm();
  }
}
