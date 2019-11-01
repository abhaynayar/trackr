import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Transaction } from './transaction.model';

const BACKEND_URL = environment.apiUrl + '/transactions/';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private transactions: Transaction[] = [];
  private transactionsUpdated = new Subject<{transactions: Transaction[], transactionCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getTransactions(transactionPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${transactionPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, transactions: any, maxTransactions: number}>(
        BACKEND_URL + queryParams
      )
      .pipe(map((transactionData) => {
        return {
          transactions: transactionData.transactions.map(transaction => {
            return {
              type: transaction.type,
              amount: transaction.amount,
              id: transaction._id,
              creator: transaction.creator
            };

          }),
          maxTransactions: transactionData.maxTransactions};
        })
      )
      .subscribe((transformedTransactionData) => {
        console.log(transformedTransactionData);
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
    return this.http.get<{
      _id: string;
      type: string;
      amount: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addTransaction(type: string, amount: string) {
    const transaction: Transaction = {id: null, type, amount, creator: null };
    this.http.post<{message: string, transactionId: string}>(BACKEND_URL, transaction)
    .subscribe((responseData) => {
      this.router.navigate(['/list']);
    });
  }

  updateTransaction(id: string, type: string, amount: string) {
    const transaction: Transaction = { id, type, amount, creator: null };
    this.http
      .put(BACKEND_URL + id, transaction)
      .subscribe(response => {
        this.router.navigate(['/list']);
      });
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete(BACKEND_URL + transactionId);
  }
}
