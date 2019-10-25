import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';

const routes: Routes = [
  {
    path: 'bar-chart',
    component: MyBarChartComponent
  },

  {
    path: '**',
    component: MyBarChartComponent
  },

  {
    path: 'line-chart',
    component: MyLineChartComponent
  },

  {
    path: '**',
    component: MyLineChartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
