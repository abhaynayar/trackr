import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

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
  isLoading = false;
  totalTransactions = 0;
  transactionsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private transactionsSub: Subscription;

  constructor(public transactionsService: TransactionsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.transactionsService.getTransactions(this.transactionsPerPage, this.currentPage);
    this.transactionsSub = this.transactionsService.getTransactionUpdateListener()
    .subscribe((transactionData: {transactions: Transaction[], transactionCount}) => {
      this.isLoading = false;
      this.totalTransactions = transactionData.transactionCount;
      this.transactions = transactionData.transactions;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.transactionsPerPage = pageData.pageSize;
    this.transactionsService.getTransactions(this.transactionsPerPage, this.currentPage);
  }

  onDelete(transactionId: string) {
    this.isLoading = true;
    this.transactionsService.deleteTransaction(transactionId).subscribe(() => {
      this.transactionsService.getTransactions(this.transactionsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.transactionsSub.unsubscribe();
  }
}
