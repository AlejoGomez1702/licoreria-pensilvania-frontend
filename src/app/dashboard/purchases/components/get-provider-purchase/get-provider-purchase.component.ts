import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NewProviderDialogComponent } from 'src/app/dashboard/providers/components/new-provider-dialog/new-provider-dialog.component';
import { Provider } from 'src/app/dashboard/providers/interfaces/Provider';
import { ProviderService } from 'src/app/dashboard/providers/services/provider.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-get-provider-purchase',
  templateUrl: './get-provider-purchase.component.html',
  styleUrls: ['./get-provider-purchase.component.scss']
})
export class GetProviderPurchaseComponent implements OnInit 
{
  public providerSelected: Provider | undefined = undefined;

  public total: number = 0;
  public provider: Provider[] = [];
  public dni: string = '';
  // Lo que se va ingresando en el campo de busqueda.
  public termDniProvider = new FormControl();
  public filteredProviders!: Observable<Provider[]>;

  constructor(
    private filterService: FilterService,
    private providerService: ProviderService,
    private sweetAlert: SweetAlertService,
    public dialogRef: MatDialogRef<GetProviderPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public purchaseTotal: number, // Cantidad con la que paga el cliente.
    public dialog: MatDialog
  ) 
  { 
    this.termDniProvider.valueChanges.subscribe(
      termDni => {
        if(termDni)
        {
          this.filteredProviders = this.filterService.searchProvidersByDni( termDni );
        }
      }
    );
  }

  ngOnInit(): void 
  {
    this.total = this.purchaseTotal;
    console.log("Tooootall compra: ", this.purchaseTotal);
  }

  get disabledPurchase(): boolean
  {
    let flag: boolean = false;
    // Si la cantidad ingresada por el cliente es menor que el total 
    if( this.purchaseTotal > this.total )
    {
      flag = true; // Deshabilitar el boton
    }

    if( !this.providerSelected )
    {
      flag = true; // Deshabilitar el boton
    }

    return flag;
  }

  onChangeProvider( provider: Provider )
  {
    this.dni = provider.dni;
    this.providerSelected = provider;
    this.termDniProvider.setValue( this.dni );
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
        // Crear cliente en el sistema.
        this.providerService.createProvider( result ).subscribe(
          provider => {
            this.onChangeProvider(provider);
            // this.loadClients();
            this.sweetAlert.presentSuccess(`Proveedor ${provider.name} Creado!`)
          },
          error => console.log(error)
        );
      }
    });
  }

  aceptDialog()
  {
    // Comprobar que el valor recibido por el cliente es mayor o igual al valor total
    // de no ser asi no se puede activar el boton de crear compra
    if( this.purchaseTotal >= this.total )
    {
      this.dialogRef.close( this.providerSelected );
    }
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }

  clearData()
  {
    this.dni = '';
    this.providerSelected = undefined;   
    this.termDniProvider.setValue('');
  }
}
