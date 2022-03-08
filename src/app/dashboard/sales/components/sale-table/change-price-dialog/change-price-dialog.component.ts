import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePrice } from '../../../interfaces/ChangePrice';

@Component({
  selector: 'app-change-price-dialog',
  templateUrl: './change-price-dialog.component.html',
  styleUrls: ['./change-price-dialog.component.scss']
})
export class ChangePriceDialogComponent implements OnInit 
{

  constructor(
    public dialogRef: MatDialogRef<ChangePriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangePrice,
  ) 
  { }

  ngOnInit(): void 
  {
    this.data.otherPrice = this.data.price;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
