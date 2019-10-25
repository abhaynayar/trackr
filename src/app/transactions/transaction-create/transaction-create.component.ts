import { Component } from '@angular/core';

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

  newTransaction = '';

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Food'},
    {value: 'pizza-1', viewValue: 'Travel'},
    {value: 'tacos-2', viewValue: 'Misc.'}
  ];

  onTransactionCreate(transactionAmount: HTMLInputElement, transactionType: HTMLSelectElement) {
    // if (form.invalid) {
    //   return;
    // }
    this.newTransaction = transactionAmount.value + ' ' + transactionType.value;
  }
}
