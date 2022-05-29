import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../../interfaces/Product';
import { DrinkService } from '../../../services/establishment-spirit/drink.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-drink-inventory',
  templateUrl: './drink-inventory.component.html',
  styleUrls: ['./drink-inventory.component.scss']
})
export class DrinkInventoryComponent implements OnInit, AfterViewInit
{
  public products: Product[] = [];

  displayedColumns = ['name', 'unit', 'sale_price', 'second_sale_price', 'stock', 'current_existence', 'actions'];
  public dataSource: MatTableDataSource<Product>;

  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  constructor(
    private drinkService: DrinkService,
    private searchService: SearchService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadProducts();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchService.searchProduct(filterValue, 'drink').subscribe(
      res => {
        this.products = res.results;        
        this.length = res.total;
        this.dataSource.data = this.products;
      },
      error => this.sweetAlert.presentError(error)
    );
  }

  createProduct()
  {
    this.router.navigate([appRoutes.createDrink]);
  }

  editDrink( row: Product )
  {
    this.router.navigate([appRoutes.editDrink + row.id]);
  }

  async deleteDrink( spirit: Product )
  {
    const { id, category, name } = spirit;
    if( id )
    {
      const { isConfirmed } = await this.sweetAlert.presentDelete(`${category.name} ${name}`);
      if(isConfirmed)
      {
        this.drinkService.deleteDrink( id ).subscribe(
          product => {
            if(product)
            {
              this.sweetAlert.presentSuccess('Producto Eliminado Correctamente!');
              this.loadProducts();
            }
          },
          () => this.sweetAlert.presentError('Eliminando Licor!')
        );
      }
    }
  }

  loadProducts(category?: string, limit?: number, from?: number): void
  {
    this.drinkService.getAllProducts().subscribe(
      res => {
        this.products = res.products;        
        this.length = res.total;
        this.dataSource.data = this.products;
      },
      error => {
        console.log(error);
      }
    );
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    this.loadProducts( undefined, this.pageSize, this.from );

    return event;
  }

}
