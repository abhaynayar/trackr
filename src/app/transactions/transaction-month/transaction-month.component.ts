import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-transaction-month',
  templateUrl: './transaction-month.component.html',
  styleUrls: ['./transaction-month.component.css']
})

export class TransactionMonthComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
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
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i][prop] === nameKey) {
          return i;
      }
    }
    return -1;
  }

  ngOnInit() {
    this.barChartData.push({data: [19, 42, 12], label: 'hello'});
  }
}
