import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from './transaction.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private transactions: Transaction[] = [];
  private transactionsUpdated = new Subject<{transactions: Transaction[], transactionCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getTransactions(transactionPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${transactionPerPage}&page=${currentPage}`;
    // return [...this.transactions];
    this.http
      .get<{message: string, transactions: any, maxTransactions: number}>(
        'http://localhost:3000/api/transactions' + queryParams
      )
      .pipe(map((transactionData) => {
        return {
          transactions: transactionData.transactions.map(transaction => {
            return {
              type: transaction.type,
              amount: transaction.amount,
              id: transaction._id
            };

          }),
          maxTransactions: transactionData.maxTransactions};
        })
      )
      .subscribe((transformedTransactionData) => {
        this.transactions = transformedTransactionData.transactions;
        this.transactionsUpdated.next({
          transactions: [...this.transactions],
          transactionCount: transformedTransactionData.maxTransactions
        });
      });
  }

  getTransactionUpdateListener() {
    return this.transactionsUpdated.asObservable();
  }

  getTransaction(id: string) {
    return this.http.get<{_id: string, type: string, amount: string}>('http://localhost:3000/api/transactions/' + id);
  }

  addTransaction(type: string, amount: string) {
    const transaction: Transaction = {id: null, type, amount};
    this.http.post<{message: string, transactionId: string}>('http://localhost:3000/api/transactions', transaction)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updateTransaction(id: string, type: string, amount: string) {
    const transaction: Transaction = { id: id, type: type, amount: amount };
    this.http
      .put('http://localhost:3000/api/transactions/' + id, transaction)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete('http://localhost:3000/api/transactions/' + transactionId);
  }
}
