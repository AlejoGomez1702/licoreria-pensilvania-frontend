import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../../interfaces/Product';
import { SpiritService } from '../../../services/establishment-spirit/spirit.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-spirit-inventory',
  templateUrl: './spirit-inventory.component.html',
  styleUrls: ['./spirit-inventory.component.scss']
})
export class SpiritInventoryComponent implements OnInit, AfterViewInit
{
  // Lo que se va ingresando en el campo de busqueda.
  public termInput = new FormControl();

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
    private spiritService: SpiritService,
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
    this.loadFilter();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort = this.sort;
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
    this.searchService.searchProduct(term, 'spirit', this.pageSize, this.from).subscribe(
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
    this.router.navigate([appRoutes.createSpirit]);
  }

  editSpirit( row: Product )
  {
    this.router.navigate([appRoutes.editSpirit + row.id]);
  }

  async deleteSpirit( spirit: Product )
  {
    const { id, category, name } = spirit;
    if( id )
    {
      const { isConfirmed } = await this.sweetAlert.presentDelete(`${category.name} ${name}`);
      if(isConfirmed)
      {
        this.spiritService.deleteSpirit( id ).subscribe(
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
    this.spiritService.getAllProducts(category, limit, from)
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
