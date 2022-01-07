import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../interfaces/Product';
import { CigaretteService } from '../../services/cigarette.service';

@Component({
  selector: 'app-cigarette-inventory',
  templateUrl: './cigarette-inventory.component.html',
  styleUrls: ['./cigarette-inventory.component.scss']
})
export class CigaretteInventoryComponent implements OnInit, AfterViewInit
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
    private cigaretteService: CigaretteService,
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

  getFullProductName(cigarette: Product): string
  {
    // return  `${spirit.category.name} ${spirit.name}`;
    return '';
  }

  getFullUnitDetail(cigarette: Product): string
  {
    return '';
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

  editCigarette( row: Product )
  {
    // this.router.navigate(['/dashboard/products/spirits/edit/' + row.id]);
  }

  async deleteCigarette( spirit: Product )
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
    // this.spiritService.getAllProducts(category, limit, from)
    // .subscribe(
    //   res => {
    //     console.log(res);
    //     this.products = res.spirits;        
    //     this.length = res.total;
    //     this.dataSource.data = this.products;
    //   },
    //   error => this.sweetAlert.presentError(error.error.error)
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
