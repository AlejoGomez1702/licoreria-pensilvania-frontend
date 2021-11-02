import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public search: string = '';
  public isEmpty: boolean = false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private _snackBar: MatSnackBar
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
    console.log(this.search);
  }

}
