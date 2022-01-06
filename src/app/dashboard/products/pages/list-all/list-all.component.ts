import { Component, OnInit } from '@angular/core';
import { SuperCategory } from '../../interfaces/SuperCategory';
import { SuperCategoryService } from '../../services/super-category.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements OnInit 
{
  public superCategories: SuperCategory[] = [{
    name: "Licores",
    icon: "local_bar",
    component: "<app-spirit-inventory></app-spirit-inventory>"
  }];

  constructor(
    private superCategoryService: SuperCategoryService
  ) 
  { }

  ngOnInit(): void 
  {
    // this.loadData();
  }

  loadData()
  {
    this.superCategoryService.getAllSuperCategories().subscribe(
      res => {
        this.superCategories = res.superCategories;
      },
      error => {
        console.log(error);
      }
    );
  }

}
