import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Transaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent implements OnInit, OnDestroy {
  // transactions = [
  //   { type: 'First transaction', amount: 'food' },
  //   { type: 'Second transaction', amount: 'food' },
  //   { type: 'Third transaction', amount: 'food' }
  // ];

  transactions: Transaction[] = [];
  private transactionsSub: Subscription;

  constructor(public transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.getTransactions();
    this.transactionsSub = this.transactionsService.getTransactionUpdateListener()
    .subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  onDelete(transactionId: string) {
    this.transactionsService.deleteTransaction(transactionId);
  }

  ngOnDestroy() {
    this.transactionsSub.unsubscribe();
  }
}
