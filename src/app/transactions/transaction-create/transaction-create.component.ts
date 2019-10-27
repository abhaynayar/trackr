import { Component, EventEmitter, Output } from '@angular/core';

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

  @Output() transactionCreated = new EventEmitter();

  onTransactionCreate() {

    const transaction = {
      type: this.enteredType,
      amount: this.enteredAmount
    };

    this.transactionCreated.emit(transaction);
  }
}
