import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Transaction } from '../transaction.model';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  foods: Food[] = [
    { value: 'food', viewValue: 'Food' },
    { value: 'travel', viewValue: 'Travel' },
    { value: 'laundry', viewValue: 'Laundry' },
    { value: 'savings', viewValue: 'Savings' },
    { value: 'groceries', viewValue: 'Groceries' },
    { value: 'rent', viewValue: 'Rent' },
    { value: 'medical', viewValue: 'Medical' },
    { value: 'shopping', viewValue: 'Shopping' },
    { value: 'misc', viewValue: 'Miscellaneous' }
  ];

  enteredType = '';
  enteredAmount = '';
  private mode = 'create';
  private transactionId: string;
  transaction: Transaction;
  isLoading = false;

  constructor(public transactionsService: TransactionsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('transactionId')) {
        this.mode = 'edit';
        this.transactionId = paramMap.get('transactionId');
        this.isLoading = true;
        this.transactionsService.getTransaction(this.transactionId).subscribe(transactionData => {
          this.isLoading = false;
          this.transaction = {
            id: transactionData._id,
            type: transactionData.type,
            amount: transactionData.amount,
            creator: transactionData.creator};
        });
      } else {
        this.mode = 'create';
        this.transactionId = null;
      }
    });

  }

  onSaveTransaction(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.transactionsService.addTransaction(form.value.enteredType, form.value.enteredAmount);
    } else {
      this.transactionsService.updateTransaction(this.transactionId, form.value.enteredType, form.value.enteredAmount);
    }
    form.resetForm();
  }
}
