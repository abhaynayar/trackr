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
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  onTransactionCreate(transactionAmount: HTMLInputElement, transactionType: HTMLSelectElement){
    this.newTransaction = transactionAmount.value + ' ' + transactionType.value;
  }
}
