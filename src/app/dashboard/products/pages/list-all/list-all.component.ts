import { Component, OnInit } from '@angular/core';
import { CigaretteInventoryComponent } from '../../components/cigarette-inventory/cigarette-inventory.component';
import { DrinkInventoryComponent } from '../../components/drink-inventory/drink-inventory.component';
import { GroceryInventoryComponent } from '../../components/grocery-inventory/grocery-inventory.component';
import { SpiritInventoryComponent } from '../../components/spirit-inventory/spirit-inventory.component';
import { SuperCategory } from '../../interfaces/SuperCategory';
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
    private superCategoryService: SuperCategoryService
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
        console.log(this.superCategories);
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
      switch (superCategory.component) 
      {
        case 'spirits-inventory':
          this.components.push(SpiritInventoryComponent);
        break;

        case 'cigarettes-inventory':
          this.components.push(CigaretteInventoryComponent);
        break;

        case 'drinks-inventory':
          this.components.push(DrinkInventoryComponent);
        break;

        case 'groceries-inventory':
          this.components.push(GroceryInventoryComponent);
        break;
      
        default:
          break;
      }
      
    }
  }

}
