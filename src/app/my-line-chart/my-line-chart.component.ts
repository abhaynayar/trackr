import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent implements OnInit {

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  lineChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public lineChartData = [
    {data: [31, 42, 17, 39, 37, 17, 32, 10, 24], label: 'Travel'},
    {data: [19, 42, 12, 8, 13, 21, 34, 55, 69], label: 'Food'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
