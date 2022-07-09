import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangeCountDialogComponent } from '../components/sale-table/change-count-dialog/change-count-dialog.component';
import { ChangePriceDialogComponent } from '../components/sale-table/change-price-dialog/change-price-dialog.component';
import { SecondPriceDialogComponent } from '../components/sale-table/second-price-dialog/second-price-dialog.component';
import { ChangePrice } from '../interfaces/ChangePrice';
import { SaleItem } from '../interfaces/SaleItem';

@Injectable({
  providedIn: 'root'
})
export class SaleTableService 
{

  constructor(
    public dialog: MatDialog
  ) 
  { }

  /**
   * Dialogo para cambiar la cantidad del producto actual
   * @param SaleItem 
   * @returns 
   */
  verifyChangeCountData( SaleItem: SaleItem )
  {
    const dialogRef = this.dialog.open(ChangeCountDialogComponent, {
      minWidth: '300px',
      maxWidth: '500px',
      data: SaleItem.count // Le paso la cantidad total registrada en la venta(Maximo)
    });

    return dialogRef;      
  }

  /**
   * Hace las validaciones y lógica para saber cuantos productos se cobran con el 
   * precio secundario(Para llevar) y cuantos se cobran al precio normal
   * @param isSecondPriceSelected 
   * @param SaleItem 
   * @returns 
   */
  verifySecondPriceData( SaleItem: SaleItem ): MatDialogRef<SecondPriceDialogComponent>
  {
    // Dialogo para seleccionar la cantidad a liquidar con el segundo precio
    const dialogRef = this.dialog.open(SecondPriceDialogComponent, {
      minWidth: '350px',
      maxWidth: '500px',
      data: SaleItem.count // Le paso la cantidad total registrada en la venta(Maximo)
    });

    return dialogRef;
  }

  verifyChangePriceData( data: ChangePrice )
  {
    const dialogRef = this.dialog.open(ChangePriceDialogComponent, {
      minWidth: '350px',
      maxWidth: '500px',
      data
    });

    return dialogRef;
  }


}
