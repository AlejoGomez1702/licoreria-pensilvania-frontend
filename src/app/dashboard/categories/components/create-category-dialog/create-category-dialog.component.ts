import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit 
{
  /**
   * Nombre de la categoría a crear.
   */
  public name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
