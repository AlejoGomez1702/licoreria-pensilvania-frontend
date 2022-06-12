import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NewClientDialogComponent } from 'src/app/dashboard/clients/components/new-client-dialog/new-client-dialog.component';
import { Client } from 'src/app/dashboard/clients/interfaces/Client';
import { ClientService } from 'src/app/dashboard/clients/services/client.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ClientSaleData } from '../../interfaces/ClientSaleData';
import { moneyBack, MoneyBack } from '../../interfaces/MoneyBack';

@Component({
  selector: 'app-cash-sale-dialog',
  templateUrl: './cash-sale-dialog.component.html',
  styleUrls: ['./cash-sale-dialog.component.scss']
})
export class CashSaleDialogComponent implements OnInit 
{  
  public clientSelected: Client | null = null;
  public dialogTitle: string = '';

  public total: number = 0;
  public noClient: boolean = false;
  public clients: Client[] = [];
  public withClient: boolean = false;
  public trustedSale: boolean = false;
  public dni: string = '';
  // Lo que se va ingresando en el campo de busqueda.
  public termDniClient = new FormControl();
  public filteredClients!: Observable<Client[]>;

  // cantidades de dinero seleccionables
  public moneyBack: MoneyBack[] = moneyBack;

  constructor(
    private clientService: ClientService,
    private filterService: FilterService,
    private sweetAlert: SweetAlertService,
    public dialogRef: MatDialogRef<CashSaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public clientSaleData: ClientSaleData, // Cantidad con la que paga el cliente.
    public dialog: MatDialog
  ) 
  { 
    this.termDniClient.valueChanges.subscribe(
      termDni => {
        if(termDni)
        {
          this.filteredClients = this.filterService.searchClientsByDni( termDni )
        }
      }
    );
  }  

  get disabledSale(): boolean
  {
    let flag: boolean = false;
    // Si la cantidad ingresada por el cliente es menor que el total 
    if( this.clientSaleData.typeSale === 'counted' )
    {
      if( this.clientSaleData.totalSale < this.total )
      {
        flag = true; // Deshabilitar el boton
      }
    }
    else
    {
      if( this.total < this.clientSaleData.totalSale )
      {
        flag = true; // Deshabilitar el boton
      }
    }

    // Si se tiene seleccionado el boton de cliente y no se a agregado aún ningúno.
    if( this.withClient && !this.clientSelected )
    {
      flag = true; // Deshabilitar el boton
    }

    return flag;
  }

  ngOnInit(): void 
  {
    this.total = this.clientSaleData.totalSale;
    if(this.clientSaleData.typeSale === 'trusted')
    {
      this.clientSaleData.totalSale = 0;
      this.dialogTitle = 'a Crédito';
      this.withClient = true;
      this.trustedSale = true;
    }
    else
    {
      this.dialogTitle = 'al Contado';
    }

    this.loadClients();
    this.moneyBack.forEach(m => {
      m.isActive = false;
    });
  }

  loadClients(category?: string, limit?: number, from?: number): void
  {
    this.clientService.getAllClients(category, limit, from)
    .subscribe(
      res => {
        this.clients = res.clients;
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  // searchClientMatch()
  // {
  //   const term = this.termDniClient.value as string | '';
  //   if( term )
  //   {
  //     this.filterService.searchClientsByDni( term ).subscribe(
  //       clients => {
  //         this.clients = clients;
  //       },
  //       (error) => {
  //         console.log("Error buscando los clientes");
  //         console.log(error);
  //       }
  //     );
  //   }
  // }

  onChangeClient( client: Client )
  {
    this.dni = client.dni;
    this.clientSelected = client;
    this.termDniClient.setValue( this.dni );
  }

  aceptDialog()
  {
    if( this.clientSaleData.typeSale === 'trusted' ) // Fiada
    {
      this.dialogRef.close({
        client: this.clientSelected, 
        deposit: this.clientSaleData.totalSale
      });
    }
    else
    {
      this.dialogRef.close({
        client: this.clientSelected
      });
    }
  }

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
            this.onChangeClient(client);
            // this.loadClients();
            this.sweetAlert.presentSuccess(`Cliente ${client.name} Creado!`)
          },
          error => console.log(error)
        );
      }
    });
  }

  selectCash(i: number)
  {
    this.moneyBack.forEach(m => {
      m.isActive = false;
    });

    this.moneyBack[i].isActive = true;
    this.clientSaleData.totalSale = this.moneyBack[i].amount;
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }

  clearData()
  {
    this.dni = '';
    this.clientSelected = null;   
    this.termDniClient.setValue('');
  }
}
