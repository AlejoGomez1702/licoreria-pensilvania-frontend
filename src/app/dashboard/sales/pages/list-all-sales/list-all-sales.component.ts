import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { RangeDateTime } from '../../interfaces/RangeDateTime';
import { Statistic } from '../../interfaces/ResponseGetAllSales';
import { Sale } from '../../interfaces/Sale';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-list-all-sales',
  templateUrl: './list-all-sales.component.html',
  styleUrls: ['./list-all-sales.component.scss']
})
export class ListAllSalesComponent implements OnInit, AfterViewInit
{
  public sales: Sale[] = [];
  public statistics: Statistic[] = [];
  public statisticsInversion: Statistic[] = [];

  displayedColumns: string[] = ['date', 'utility', 'client', 'user', 'total', 'actions'];
  dataSource: MatTableDataSource<Sale>;

  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  // Selección de rango de fechas
  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  // Selección de rango de tiempo
  public rangeTime = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });


  // public rangeTime: RangeDateTime = {
  //   start: undefined,
  //   end: undefined
  // };

  constructor(
    private saleService: SaleService,
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {    
    this.loadSales();
    // this.rangeTime.get('end')?.valueChanges.subscribe(
    //   res => {
    //     this.loadSales( undefined, undefined, this.range.value, this.rangeTime.value );
    //     console.log(this.rangeTime.value);
    //   }
    // );
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }   

  loadSales(limit?: number, from?: number, range?: RangeDateTime, rangeTime?: RangeDateTime): void
  {
    this.saleService.getAllSales(limit, from, range, rangeTime).subscribe(
      res => {        
        this.sales = res.sales;
        this.length = res.total;
        this.statistics = res.statistics;
        this.statisticsInversion = res.statisticsInversion;
        this.dataSource.data = this.sales;
        console.log("statistics: ", this.statistics);
        console.log("statisticsInversion: ", this.statisticsInversion);

      },
      error => {
        console.log(error);
      }
    );
  }

  getSalesTotal(): number
  {
    let totalAmmount = 0;

    this.statistics.forEach(statistic => {
      totalAmmount += statistic.totalAmount;
    });

    return totalAmmount;
  }

  getSalesInversionTotal()
  {
    let totalAmmount = 0;

    this.statisticsInversion.forEach(statistic => {
      totalAmmount += statistic.totalAmount;
    });

    return totalAmmount;
  }

  getUtilityTotal()
  {
    const salesTotal = this.getSalesTotal();
    const salesInversionTotal = this.getSalesInversionTotal();

    return salesTotal - salesInversionTotal;
  }

  /**
   * Filtrar las vetas en un rango de fechas
   */
  filterSales()
  {

    console.log("range: ", this.range.value);
    console.log("range time: ", this.rangeTime.value)

    const { start, end } = this.range.value;
    const { start: startTime, end: endTime } = this.rangeTime.value;
    if( !end ) return;

    const startTimeDate: Date = startTime;
    const endTimeDate: Date = endTime;

    // if( startTimeDate?.getTime() > endTimeDate?.getTime() ) return;  

    // const endDate = moment( end ).add( 23, 'h' )
    //                              .add( 59, 'm' )
    //                              .add( 59, 's' )
    //                              .add( 999, 'ms' )
    //                              .toDate();
    this.range.reset({ start, end });
    this.rangeTime.reset({ start: startTime, end: endTime });
    this.loadSales(undefined, undefined, this.range.value, this.rangeTime.value);

  }

  goToCreateSale(): void
  {
    this.router.navigate([appRoutes.createSale]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClientName( sale: Sale ): string
  {
    const { client } = sale;

    if( client )
    {
      return client.name;
    }

    return '-------';
  }

  getUtility( sale: Sale ): number
  {
    const { total, total_inversion } = sale;
    return ( total - total_inversion );
  }

  showSaleDetail( sale: Sale )
  {
    this.router.navigate(['/dashboard/sales/show/' + sale.id]);
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    this.loadSales( this.pageSize, this.from );

    return event;
  }

  // prueba()
  // {
  //   const a = this.range.get('start')?.value + '';
  //   const aa = this.range.get('end')?.value + '';

  //   console.log("a: ", a);
  //   console.log("aa: ", aa);
  //   console.log("condicion: ", aa === a);
  // }
}
