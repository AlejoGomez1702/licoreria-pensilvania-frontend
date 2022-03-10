import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
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

  displayedColumns: string[] = ['date', 'total', 'utility', 'client', 'user', 'actions'];
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
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }   

  loadSales(limit?: number, from?: number): void
  {
    this.saleService.getAllSales(limit, from).subscribe(
      res => {        
        this.sales = res.sales;
        this.length = res.total;
        this.statistics = res.statistics;
        this.dataSource.data = this.sales;
        console.log(res);
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

  filterSales()
  {

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

  getTotalValue( sale: Sale )
  {
    const { products } = sale;
    const individualTotals = products.map(p => (p.count * p.sale_price));
    const total = individualTotals.reduce(( a, b ) => a + b, 0);
    
    return total;
  }

  getUtility( sale: Sale ): number
  {
    const { products } = sale;
    const individualTotals = products.map(p => {
      const purchasePrice = p.purchase_price || 0;
      return ( p.count * purchasePrice );
    });
    const totalWithUtility = individualTotals.reduce(( a, b ) => a + b, 0);
    const totalInversion = this.getTotalValue( sale );

    // Si el precio total con utilidad es menor que la inversión es porque...
    // los productos no tienen registrado el precio de compra.
    if( totalWithUtility < totalInversion )
    {
      return 0;
    }

    return (totalWithUtility - totalInversion);
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    this.loadSales( this.pageSize, this.from );

    return event;
  }

}
