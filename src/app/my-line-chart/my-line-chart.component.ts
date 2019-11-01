import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Transaction } from '../transactions/transaction.model';
import { TransactionsService } from '../transactions/transactions.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent implements OnInit, OnDestroy {

  transactions: Transaction[] = [];
  private transactionsSub: Subscription;

  constructor(public transactionsService: TransactionsService) {}

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  lineChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public lineChartType = 'line';
  public lineChartLegend = true;

  chart: any;

  public lineChartData = [
    {data: [31, 42, 17, 39, 37, 17, 32, 10, 24], label: 'Travel'},
    {data: [19, 42, 12, 8, 13, 21, 34, 55, 69], label: 'Food'},
  ];

  totalTransactions = 0;
  transactionsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 7];

  ngOnInit() {
    this.transactionsService.getTransactions(this.transactionsPerPage, this.currentPage);
    this.transactionsSub = this.transactionsService.getTransactionUpdateListener()
    .subscribe((transactionData: {transactions: Transaction[], transactionCount}) => {
      this.transactions = transactionData.transactions;
      const blah = this.transactions.map(item => parseInt(item.amount, 10));

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.lineChartLabels,
          datasets: [
            {
              data: blah,
              borderColor: '#3cba9f'
            }
          ],
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
          },
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50
            }
        }
      }
      });
    });
  }

  onDelete(transactionId: string) {
    this.transactionsService.deleteTransaction(transactionId);
  }

  ngOnDestroy() {
    this.transactionsSub.unsubscribe();
  }
}
