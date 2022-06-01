import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent implements OnInit 
{
  @Input() title: string = '';
  @Input() productType: string = '';

  // Lo que se va ingresando en el campo de busqueda.
  public termInput = new FormControl();

  public products: Product[] = [];
  
  // public displayedColumns = ['name', 'unit', 'sale_price', 'stock', 'current_existence', 'actions'];
  public displayedColumns: string[] = ['name', 'unit', 'sale_price', 'stock', 'current_existence', 'actions'];
  public withSecondPrice: boolean = false;

  public dataSource: MatTableDataSource<Product>;

  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { 
    this.verifyFields();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.verifyFields();
    this.loadProducts();
    this.loadFilter();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  verifyFields()
  {
    switch (this.productType) 
    {
      case 'spirit':
        this.displayedColumns.splice(3, 0, 'second_sale_price');
        this.withSecondPrice = true;
      break;
    
      default:
      break;
    }
  }

  loadFilter()
  {
    this.termInput.valueChanges.subscribe(
      termInput => {
        if(termInput)
        {
          this.applyFilter( termInput );
        }
      }
    );
  }

  applyFilter( term: string ) 
  {
    this.searchService.searchProduct(term, this.productType, this.pageSize, this.from).subscribe(
      res => {
        console.log(res);
        this.products = res.results;        
        this.length = res.total;
        this.dataSource.data = this.products;
      },
      error => this.sweetAlert.presentError(error)
    );
  }

  createProduct()
  {
    this.router.navigate([appRoutes.createNaturist]);
  }

  editProduct( row: Product )
  {
    this.router.navigate([appRoutes.editNaturist + row.id]);
  }

  async deleteProduct( product: Product )
  {
    const { id, category, name } = product;
    if( id )
    {
      const { isConfirmed } = await this.sweetAlert.presentDelete(`${category.name} ${name}`);
      if(isConfirmed)
      {
        this.productService.deleteProduct( id ).subscribe(
          product => {
            if(product)
            {
              this.sweetAlert.presentSuccess('Producto Eliminado Correctamente!');
              this.loadProducts();
            }
          },
          () => this.sweetAlert.presentError('Eliminando Producto!')
        );
      }
    }
  }

  loadProducts(category?: string, limit?: number, from?: number): void
  {
    this.productService.getAllProducts(this.productType, category, limit, from)
    .subscribe(
      res => {
        this.products = res.products;        
        this.length = res.total;
        this.dataSource.data = this.products;
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    if(this.termInput.value)
    {
      this.applyFilter( this.termInput.value );
    }
    else
    {
      this.loadProducts( undefined, this.pageSize, this.from );
    }

    return event;
  }
}