import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleItem } from 'src/app/dashboard/sales/interfaces/SaleItem';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit 
{
  public total: number = 0;
  public createDate: Date = new Date();
  public purchaseId: string = '';
  public products: SaleItem[] = [];

  public dataSource: MatTableDataSource<SaleItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'total'];

  constructor(
    private purchaseService: PurchaseService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource<SaleItem>();
    this.dataSource.data = this.products; 
  }

  ngOnInit(): void 
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
      this.getPurchaseSelected( id )
    }
    else
    {
      this.sweetAlert.presentError('Error iniciando el licor seleccionado (NO ID)');
      this.router.navigate(['/dashboard/products']);
    }
  }

  getPurchaseSelected( id: string )
  {
    this.purchaseService.getPurchaseById( id ).subscribe(
      res => {
        console.log("Productos", res);
        this.total = res.total;
        this.createDate = res.created_at;
        this.purchaseId = res.id;
        this.products = res.products;
        this.dataSource.data = this.products;
      },
      error => {console.log(error)}
    );
  }

  getUnitPrice(product: SaleItem): number
  {
    return product.sale_price;
  }

  getProductTotal(product: SaleItem)
  {
    return `${(product.count * product.sale_price)}`;
  }

}
