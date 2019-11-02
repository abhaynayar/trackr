import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../transactions/transaction.model';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../transactions/transactions.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.scss']
})
export class MyBarChartComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  private transactionsSub: Subscription;

  constructor(public transactionsService: TransactionsService) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels = ['2016', '2017', '2018'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [31, 42, 17, 39, 37, 17, 32, 10, 24], label: 'travel'},
    {data: [19, 42, 12], label: 'food'},
  ];

  chart: any;

  ngOnInit() {
    this.transactionsService.getTransactions(null, null);
    this.transactionsSub = this.transactionsService.getTransactionUpdateListener()
    .subscribe((transactionData: {transactions: Transaction[], transactionCount}) => {
      this.transactions = transactionData.transactions;
      const barChartLabels1 = this.transactions.map(item => item.type);
      const barChartData1 = this.transactions.map(item => parseInt(item.amount, 10));
      this.barChartLabels = barChartLabels1;

      console.log();

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
