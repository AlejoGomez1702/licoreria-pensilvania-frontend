import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit 
{
  public categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void 
  {
    this.loadCategories();
  }

  loadCategories()
  {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories.categories;
      },
      error => console.log("Error obteniendo categorias")
    );
  }

}
