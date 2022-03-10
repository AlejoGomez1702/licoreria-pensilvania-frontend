import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Statistic } from '../../../interfaces/ResponseGetAllSales';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit 
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() 
  set statistics(statisticsData: Statistic[])
  {
    // this.statisticsData = statisticsData;
    this.statisticsData = statisticsData.sort((a, b) => (a.day-b.day));
    this.refreshGraph();  
  }

  private statisticsData: Statistic[] = [];  

  public barChartData: ChartData<'bar'> = {
    labels: this.getDays,
    datasets: [
      { data: this.getTotals, label: 'Ventas Por Dia' },
      // { data: [ 500000, 600000, 800000, 810000, 560000, 550000, 400000, 400000, 400000, 400000, 400000, 400000 ], label: 'Compras' }
    ]
  };

  constructor() { }

  ngOnInit(): void 
  {
    // console.log(this.statistics);
  }

  get getTotals(): number[]
  {    
    const data =  this.statisticsData.map(s => {
      return s.totalAmount;
    });

    return data;
  }

  get getDays(): string[]
  {    
    let initialDate;
    let auxDate;
    let momentDate;
    let monthAndYear;
    let dayAndMonth;

    const data =  this.statisticsData.map(s => {
      initialDate = new Date(s.year, 0);
      auxDate = new Date(initialDate.setDate(s.day));
      momentDate = moment(auxDate).locale('es');
      monthAndYear = momentDate.format('ll');
      dayAndMonth = monthAndYear.split('.')[0];

      return dayAndMonth;
    });

    return data;
  }

  refreshGraph()
  {
    this.barChartData = {
      labels: this.getDays,
      datasets: [
        { data: this.getTotals, label: 'Ventas Por Dia' },
        // { data: [ 500000, 600000, 800000, 810000, 560000, 550000, 400000, 400000, 400000, 400000, 400000, 400000 ], label: 'Compras' }
      ]
    };
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    // plugins: {
    //   legend: {
    //     display: true,
    //   }
    // }
  };
  public barChartType: ChartType = 'bar';

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(this.statistics);
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

}
