import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePriceDialogComponent } from '../change-price-dialog/change-price-dialog.component';

@Component({
  selector: 'app-change-count-dialog',
  templateUrl: './change-count-dialog.component.html',
  styleUrls: ['./change-count-dialog.component.scss']
})
export class ChangeCountDialogComponent
{
  constructor(
    public dialogRef: MatDialogRef<ChangePriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) 
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
