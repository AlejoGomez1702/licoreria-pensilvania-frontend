import { Component, OnInit } from '@angular/core';
import { CigaretteInventoryComponent } from '../../components/establishment-spirit/cigarette-inventory/cigarette-inventory.component';
import { DrinkInventoryComponent } from '../../components/establishment-spirit/drink-inventory/drink-inventory.component';
import { GroceryInventoryComponent } from '../../components/establishment-spirit/grocery-inventory/grocery-inventory.component';
import { SpiritInventoryComponent } from '../../components/establishment-spirit/spirit-inventory/spirit-inventory.component';
import { SuperCategory } from '../../interfaces/SuperCategory';
import { InventoryService } from '../../services/inventory.service';
import { SuperCategoryService } from '../../services/super-category.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements OnInit 
{
  public components: any[] = [];
  public superCategories: SuperCategory[] = [];

  constructor(
    private superCategoryService: SuperCategoryService,
    private inventoryService: InventoryService
  ) 
  { }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.superCategoryService.getAllSuperCategories().subscribe(
      res => {
        this.superCategories = res.superCategories;
        this.loadComponents();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadComponents()
  {
    for (const superCategory of this.superCategories) 
    {
      const componentToPaint = this.inventoryService.veryfyInventoryComponent(superCategory);
      this.components.push(componentToPaint);
    }
  }
  
}
