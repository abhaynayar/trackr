import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Transaction } from '../transaction.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit, OnDestroy {

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
  private authStatusSub: Subscription;

  transaction: Transaction;
  isLoading = false;

  constructor(
    public transactionsService: TransactionsService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(
        authStatus => {
          this.isLoading = false;
      });
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
            remark: transactionData.remark,
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
      this.transactionsService
      .addTransaction
      (
        form.value.enteredType,
        form.value.enteredAmount,
        form.value.enteredRemark
      );
    } else {
      this.transactionsService
      .updateTransaction
      (
        this.transactionId,
        form.value.enteredType,
        form.value.enteredAmount,
        form.value.enteredRemark
      );
    }
    form.resetForm();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
