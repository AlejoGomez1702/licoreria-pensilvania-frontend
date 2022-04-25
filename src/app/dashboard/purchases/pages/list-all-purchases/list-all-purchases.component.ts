import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { Purchase } from '../../interfaces/Purchase';
import { Statistic } from '../../interfaces/ResponseGetAllPurchases';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-list-all-purchases',
  templateUrl: './list-all-purchases.component.html',
  styleUrls: ['./list-all-purchases.component.scss']
})
export class ListAllPurchasesComponent implements OnInit 
{
  public purchases: Purchase[] = [];
  public statistics: Statistic[] = [];

  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = ['date', 'total', 'provider', 'user', 'actions'];
  dataSource: MatTableDataSource<Purchase>;

  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  constructor(
    private purchaseService: PurchaseService,
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadPurchases();
  }

  loadPurchases(limit?: number, from?: number)
  {
    this.purchaseService.getAllPurchases(limit, from).subscribe(
      res => {        
        this.purchases = res.purchases;
        this.length = res.total;
        this.statistics = res.statistics;
        this.dataSource.data = this.purchases;
        console.log("Comprrassss: ",res);
      },
      error => {
        console.log(error); 
      }
    );
  }

  getTotalValue( purchase: Purchase )
  {
    const { products } = purchase;
    const individualTotals = products.map(p => (p.count * (p.purchase_price || 0)));
    const total = individualTotals.reduce(( a, b ) => a + b, 0);
    
    return total;
  }

  filterPurchases()
  {

  }

  showPurchaseDetail( purchase: Purchase )
  {
    this.router.navigate(['/dashboard/purchases/show/' + purchase.id]);
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    this.loadPurchases( this.pageSize, this.from );

    return event;
  }

  goToCreatePurchase(): void
  {
    this.router.navigate([appRoutes.createPurchase]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
