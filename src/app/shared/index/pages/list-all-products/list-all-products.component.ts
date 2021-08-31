import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { ProductService } from 'src/app/dashboard/products/services/product.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
declare const main: any;

@Component({
  selector: 'app-list-all-products',
  templateUrl: './list-all-products.component.html',
  styleUrls: ['./list-all-products.component.scss']
})
export class ListAllProductsComponent implements OnInit 
{
  public products: Product[] = [];
  public categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private sweetAlert: SweetAlertService,
    private filterService: FilterService
  ) 
  { 
    // this.loadData();
  }

  ngOnInit(): void 
  {    
    this.loadData();
    main();
  }

  loadData()
  {    
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts(category?: string): void
  {
    this.productService.getAllProducts(category)
    .subscribe(res => {
      this.products = res.products;
      main();
    },
    error => {
      this.sweetAlert.presentError(error.error.error);
    });
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

  selectCategory(CategoryId: string)
  {
    this.loadProducts( CategoryId );
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue)
    {
      this.filterService.getProducts( filterValue )
      .subscribe(res => {
        this.products = res.products;
        main();
      },
      error => {
        this.sweetAlert.presentError(error.error.error);
      });
    }
  }
}
