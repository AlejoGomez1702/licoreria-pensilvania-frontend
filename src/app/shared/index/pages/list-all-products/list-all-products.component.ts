import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  // MatPaginator Inputs
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];

  // MatPaginator Output
  pageEvent!: PageEvent;
  
  public categorySelected: string = '';

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
    this.loadProducts( undefined, 8, 0 );
  }

  loadProducts(category?: string, limit?: number, from?: number): void
  {
    this.productService.getAllProducts(category, limit, from)
    .subscribe(res => {
      this.products = res.products;
      this.length = res.total;

      // this.totalProducts = res.total;
      // console.log(this.totalProducts);
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

  selectCategory(categoryId: string)
  {
    this.categorySelected = categoryId;
    this.loadProducts( categoryId, this.pageSize, this.from );
  }

  resetCategory()
  {
    this.categorySelected = '';
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

  getFullProductName( product: Product ): string
  {
    let name = `${ product.category.name } ${ product.name }`;
    for (const feature of product.features) 
    {
      name += ' ' + feature;      
    }

    return name;
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;

    // console.log(this.from);

    this.loadProducts( this.categorySelected, this.pageSize, this.from );

    return event;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


}
