import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit 
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',  ],
    datasets: [
      { data: [ 500000, 600000, 800000, 810000, 560000, 550000, 400000, 400000, 400000, 400000, 400000, 400000 ], label: 'Ventas' },
      { data: [ 500000, 600000, 800000, 810000, 560000, 550000, 400000, 400000, 400000, 400000, 400000, 400000 ], label: 'Compras' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
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
