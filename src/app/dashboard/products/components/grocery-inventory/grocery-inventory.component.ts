import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../interfaces/Product';
import { DrinkService } from '../../services/drink.service';

@Component({
  selector: 'app-grocery-inventory',
  templateUrl: './grocery-inventory.component.html',
  styleUrls: ['./grocery-inventory.component.scss']
})
export class GroceryInventoryComponent implements OnInit, AfterViewInit
{
  public products: Product[] = [];

  displayedColumns = ['name', 'unit', 'sale_price', 'stock', 'current_existence', 'actions'];
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
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createProduct()
  {
    // this.router.navigate(['/dashboard/products/create/spirits']);
  }

  editGrocery( row: Product )
  {
    // this.router.navigate(['/dashboard/products/spirits/edit/' + row.id]);
  }

  async deleteGrocery( spirit: Product )
  {
    const { id, category, name } = spirit;
    if( id )
    {
      const { isConfirmed } = await this.sweetAlert.presentDelete(`${category.name} ${name}`);
      if(isConfirmed)
      {
        // this.spiritService.deleteSpirit( id ).subscribe(
        //   product => {
        //     if(product)
        //     {
        //       this.sweetAlert.presentSuccess('Licor Eliminado Correctamente!');
        //       this.loadProducts();
        //     }
        //   },
        //   () => this.sweetAlert.presentError('Eliminando Licor!')
        // );
      }
    }
  }

  loadProducts(category?: string, limit?: number, from?: number): void
  {
    // this.cigaretteService.getAllProducts().subscribe(
    //   res => {
    //     this.products = res.cigarettes;        
    //     this.length = res.total;
    //     this.dataSource.data = this.products;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
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
