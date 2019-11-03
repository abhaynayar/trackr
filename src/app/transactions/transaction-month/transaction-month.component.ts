import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Transaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-transaction-month',
  templateUrl: './transaction-month.component.html',
  styleUrls: ['./transaction-month.component.css']
})

export class TransactionMonthComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  private transactionsSub: Subscription;

  hellobro = 0;

  constructor(public transactionsService: TransactionsService) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels =  [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [], label: 'food'},
    {data: [], label: 'travel'},
    {data: [], label: 'laundry'},
    {data: [], label: 'shopping'},
    {data: [], label: 'groceries'},
  ];

  search(nameKey, prop, myArray) {
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i][prop] === nameKey) {
          return i;
      }
    }
    return -1;
  }

  ngOnInit() {
    this.transactionsService.getTransactions(null, null);
    this.transactionsSub = this.transactionsService.getTransactionUpdateListener()
    .subscribe((transactionData: {transactions: Transaction[], transactionCount}) => {
      this.transactions = transactionData.transactions;
      const currentMonth = new Date().getMonth();

      for (var i = 0; i < this.transactions.length; ++i) {
        const arr = this.transactions[i].date.split('-');
        const monthIndex =  parseInt(arr[1], 10) - 1;
        if (monthIndex === currentMonth) {
          this.hellobro += parseInt(this.transactions[i].amount, 10);
        }

        // this.barChartData.push({data: [19, 42, 12], label: 'hello'});
        const type = this.transactions[i].type;
        const search = this.search(type, 'label', this.barChartData);
        if (search !== -1) {
          this.barChartData[search].data[monthIndex] = parseInt(this.transactions[i].amount, 10);
        } else {
          this.barChartData.push({data: [], label: type});
          const search2 = this.search(type, 'label', this.barChartData);
          this.barChartData[search2].data[monthIndex] = parseInt(this.transactions[i].amount, 10);
        }
      }

      // const barChartLabels1 = this.transactions.map(item => item.type);
      // const barChartData1 = this.transactions.map(item => parseInt(item.amount, 10));
      // this.barChartLabels = barChartLabels1;

      // this.barChartData = barChartData1;
      // this.chart = new Chart('canvas', {
      //   type: 'bar',
      //   data: {
      //     datasets: [{
      //         barPercentage: 0.5,
      //         barThickness: 6,
      //         maxBarThickness: 8,
      //         minBarLength: 2,
      //         data: [10, 20, 30, 40, 50, 60, 70]
      //     }]
      //   },
      // });
    });
  }

  onDelete(transactionId: string) {
    this.transactionsService.deleteTransaction(transactionId);
  }

  ngOnDestroy() {
    this.transactionsSub.unsubscribe();
  }
}
