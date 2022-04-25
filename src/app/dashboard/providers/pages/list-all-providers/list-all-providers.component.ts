import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { NewProviderDialogComponent } from '../../components/new-provider-dialog/new-provider-dialog.component';
import { Provider } from '../../interfaces/Provider';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-list-all-providers',
  templateUrl: './list-all-providers.component.html',
  styleUrls: ['./list-all-providers.component.scss']
})
export class ListAllProvidersComponent implements OnInit 
{
  public providers: Provider[] = [];

  public displayedColumns = ['dni', 'name', 'cellphone', 'email', 'actions'];
  public dataSource: MatTableDataSource<Provider>;

  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  constructor(
    private providerService: ProviderService,
    private sweetAlert: SweetAlertService,
    public dialog: MatDialog
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadProviders();
  }

  loadProviders(category?: string, limit?: number, from?: number): void
  {
    this.providerService.getAllProviders(category, limit, from)
    .subscribe(
      res => {
        console.log(res);
        this.providers = res.providers;        
        this.length = res.total;
        this.dataSource.data = this.providers;
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  createProvider()
  {
    const provider: Provider = {
      dni: '',
      name: '',
      cellphone: '',
      email: ''
    };

    const dialogRef = this.dialog.open(NewProviderDialogComponent, {
      width: '250px',
      data: {...provider},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        // Crear proveedor en el sistema.
        this.providerService.createProvider( result ).subscribe(
          provider => {
            this.loadProviders();
            this.sweetAlert.presentSuccess(`Proveedor ${provider.name} Creado!`)
          },
          error => console.log(error)
        );
      }
    });
  }

  editProvider(provider: Provider)
  {
    const dialogRef = this.dialog.open(NewProviderDialogComponent, {
      width: '250px',
      data: {...provider},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        // console.log("result: ", result);
        // Editar cliente en el sistema.
        this.providerService.updateProvider( result ).subscribe(
          provider => {
            this.loadProviders();
            this.sweetAlert.presentSuccess(`Cliente ${provider.name} Actualizado!`);
          },
          error => console.log(error)
        );
      }
    });
  }

  async deleteProvider( provider: Provider )
  {
    const { id } = provider;
    if( id )
    {
      const { isConfirmed } = await this.sweetAlert.presentDelete(`${provider.name}`);
      if(isConfirmed)
      {
        this.providerService.deleteProvider( provider ).subscribe(
          provider => {
            if(provider)
            {
              this.sweetAlert.presentSuccess('Proveedor Eliminado Correctamente!');
              this.loadProviders();
            }
          },
          () => this.sweetAlert.presentError('Eliminando Proveedor!')
        );
      }
    }
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.searchService.searchProduct(filterValue, 'spirit').subscribe(
    //   res => {
    //     this.products = res.results;        
    //     this.length = res.total;
    //     this.dataSource.data = this.products;
    //   },
    //   error => this.sweetAlert.presentError(error)
    // );
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    this.loadProviders( undefined, this.pageSize, this.from );

    return event;
  }

}
