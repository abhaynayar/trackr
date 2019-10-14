import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.scss']
})
export class MyBarChartComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels = ['2016', '2017', '2018'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [31, 42, 17, 39, 37, 17, 32, 10, 24], label: 'Travel'},
    {data: [19, 42, 12], label: 'Food'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
