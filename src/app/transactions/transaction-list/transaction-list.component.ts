import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Transaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent implements OnInit, OnDestroy {

  transactions: Transaction[] = [];
  isLoading = false;
  totalTransactions = 0;
  transactionsPerPage = 7;
  currentPage = 1;
  pageSizeOptions = [1, 3, 7];
  userIsAuthenticated = false;
  userId: string;

  private transactionsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public transactionsService: TransactionsService, private authService: AuthService ) {}

  ngOnInit() {
    this.isLoading = true;
    this.transactionsService.getTransactions(this.transactionsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.transactionsSub = this.transactionsService.getTransactionUpdateListener()
    .subscribe((transactionData: {transactions: Transaction[], transactionCount}) => {
      this.isLoading = false;
      this.totalTransactions = transactionData.transactionCount;
      this.transactions = transactionData.transactions;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.transactionsSub.unsubscribe();
  }
}
