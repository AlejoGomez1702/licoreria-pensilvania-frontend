import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
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
    private sweetAlert: SweetAlertService
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadClients();
  }

  createClient()
  {

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
