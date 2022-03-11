import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CartItem } from '../../interfaces/CartItem';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit
{
  public total: number = 0;
  public createDate: Date = new Date();
  public saleId: string = '';
  public products: CartItem[] = [];

  public dataSource: MatTableDataSource<CartItem>;
  displayedColumns = ['product', 'count', 'unit_price', 'total'];

  constructor(
    private saleService: SaleService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource<CartItem>();
    this.dataSource.data = this.products;    
  }

  ngOnInit(): void 
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
      this.getSaleSelected( id )
    }
    else
    {
      this.sweetAlert.presentError('Error iniciando el licor seleccionado (NO ID)');
      this.router.navigate(['/dashboard/products']);
    }
  }

  getSaleSelected( id: string )
  {
    this.saleService.getSaleById( id ).subscribe(
      res => {
        console.log("Productos", res);
        this.total = res.total;
        this.createDate = res.created_at;
        this.saleId = res.id;
        this.products = res.products;
        this.dataSource.data = this.products;
      },
      error => {console.log(error)}
    );
  }

  getUnitPrice(product: CartItem): number
  {
    return product.sale_price;
  }

  getProductTotal(product: CartItem)
  {
    return `${(product.count * product.sale_price)}`;
  }

}
