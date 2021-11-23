import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { SaleService } from '../../services/sale.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
];

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit 
{
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: string = '';
  // Si el carrito de compras esta vacio o no.
  public isEmpty: boolean = false;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private filterService: FilterService,
    private _snackBar: MatSnackBar,    
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void 
  {
    this._snackBar.open("Carrito de compras vacío, AGREGUE PRODUCTOS!", "OK");
  }

  openSnackBar() 
  {
    // this._snackBar.open("Hola", "Bebe");
    this.isEmpty = !this.isEmpty;
    this._snackBar.dismiss();
  }

  searchProduct()
  {
    this.filterService.searchProductByBarcode( this.search ).subscribe(
      product => {
        if(!product) this.sweetAlert.presentError( 'No se encontro el código de barras' );
        console.log(product);
      },
      error => this.sweetAlert.presentError( error.msg )
    );
    console.log(this.search);
  }

}
