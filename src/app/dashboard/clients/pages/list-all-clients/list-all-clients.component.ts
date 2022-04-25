import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { NewClientDialogComponent } from '../../components/new-client-dialog/new-client-dialog.component';
import { Client } from '../../interfaces/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-list-all-clients',
  templateUrl: './list-all-clients.component.html',
  styleUrls: ['./list-all-clients.component.scss']
})
export class ListAllClientsComponent implements OnInit 
{
  public clients: Client[] = [];

  public displayedColumns = ['dni', 'name', 'cellphone', 'address', 'actions'];
  public dataSource: MatTableDataSource<Client>;

  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  constructor(
    private clientService: ClientService,
    private sweetAlert: SweetAlertService,
    public dialog: MatDialog
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadClients();
  }

  /**
   * Crear un cliente en el sistema.
   */
  createClient()
  {
    const client: Client = {
      dni: '',
      name: '',
      cellphone: '',
      address: ''
    };

    const dialogRef = this.dialog.open(NewClientDialogComponent, {
      width: '250px',
      data: {...client},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        // Crear cliente en el sistema.
        this.clientService.createClient( result ).subscribe(
          client => {
            this.loadClients();
            this.sweetAlert.presentSuccess(`Cliente ${client.name} Creado!`)
          },
          error => console.log(error)
        );
      }
    });
  }

  /**
   * Editar un cliente
   * @param client 
   */
  editClient( client: Client )
  {
    const dialogRef = this.dialog.open(NewClientDialogComponent, {
      width: '250px',
      data: {...client},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        // Editar cliente en el sistema.
        this.clientService.updateClient( result ).subscribe(
          client => {
            this.loadClients();
            this.sweetAlert.presentSuccess(`Cliente ${client.name} Actualizado!`);
          },
          error => console.log(error)
        );
      }
    });
  }

  async deleteClient( client: Client )
  {
    const { id } = client;
    if( id )
    {
      const { isConfirmed } = await this.sweetAlert.presentDelete(`${client.name}`);
      if(isConfirmed)
      {
        this.clientService.deleteClient( client ).subscribe(
          client => {
            if(client)
            {
              this.sweetAlert.presentSuccess('Cliente Eliminado Correctamente!');
              this.loadClients();
            }
          },
          () => this.sweetAlert.presentError('Eliminando Cliente!')
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

  loadClients(category?: string, limit?: number, from?: number): void
  {
    this.clientService.getAllClients(category, limit, from)
    .subscribe(
      res => {
        console.log(res);
        this.clients = res.clients;        
        this.length = res.total;
        this.dataSource.data = this.clients;
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    this.loadClients( undefined, this.pageSize, this.from );

    return event;
  }

}
