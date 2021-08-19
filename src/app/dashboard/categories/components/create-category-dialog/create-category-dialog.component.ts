import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../interfaces/category.interfaces';

// export interface DialogData {
//   id: string;
//   name: string;
// }

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit 
{
  constructor(
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }

  closeWithData(): void 
  {
    this.dialogRef.close({ data: this.data });
  }

}
