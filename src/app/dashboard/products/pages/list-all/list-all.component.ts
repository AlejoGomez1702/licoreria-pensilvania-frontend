import { Component, OnInit } from '@angular/core';
import { CigaretteInventoryComponent } from '../../components/cigarette-inventory/cigarette-inventory.component';
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
        case 'spirit-inventory':
          this.components.push(SpiritInventoryComponent);
        break;

        case 'cigarette-inventory':
          this.components.push(CigaretteInventoryComponent);
        break;
      
        default:
          break;
      }
      
    }
  }

}
