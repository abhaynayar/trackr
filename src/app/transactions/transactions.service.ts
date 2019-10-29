import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from './transaction.model';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private transactions: Transaction[] = [];
  private transactionsUpdated = new Subject<Transaction[]>();

  constructor(private http: HttpClient) {}

  getTransactions() {
    // return [...this.transactions];
    this.http
      .get<{message: string, transactions: any}>(
        'http://localhost:3000/api/transactions'
      )
      .pipe(map((transactionData) => {
        return transactionData.transactions.map(transaction => {
          return {
            type: transaction.type,
            amount: transaction.amount,
            id: transaction._id
          };

        });
      }))
      .subscribe((transformedTransactions) => {
        this.transactions = transformedTransactions;
        this.transactionsUpdated.next([...this.transactions]);
      });
  }

  getTransactionUpdateListener() {
    return this.transactionsUpdated.asObservable();
  }

  addTransaction(type: string, amount: string) {
    const transaction: Transaction = {id: null, type, amount};
    this.http.post<{message: string, transactionId: string}>('http://localhost:3000/api/transactions', transaction)
    .subscribe((responseData) => {
      const id = responseData.transactionId;
      transaction.id = id;
      this.transactions.push(transaction);
      this.transactionsUpdated.next([...this.transactions]);
    });
  }

  deleteTransaction(transactionId: string) {
    this.http.delete('http://localhost:3000/api/transactions/' + transactionId)
      .subscribe(() => {
        const updatedTransactions = this.transactions.filter(transaction => transaction.id !== transactionId);
        this.transactions = updatedTransactions;
        this.transactionsUpdated.next([...this.transactions]);
      });
  }
}
