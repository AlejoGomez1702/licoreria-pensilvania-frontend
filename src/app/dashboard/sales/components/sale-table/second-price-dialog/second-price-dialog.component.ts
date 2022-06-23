import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-second-price-dialog',
  templateUrl: './second-price-dialog.component.html',
  styleUrls: ['./second-price-dialog.component.scss']
})
export class SecondPriceDialogComponent implements OnInit 
{
  // Cuantos productos se venderán con precio secundario
  public countSecondPrice: number = this.countTotal;

  constructor(
    public dialogRef: MatDialogRef<SecondPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public countTotal: number, // Cantidad del producto en la venta.
  ) 
  { }

  ngOnInit(): void {
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }

  aceptDialog()
  {
    this.dialogRef.close( this.countSecondPrice );
  }

}
