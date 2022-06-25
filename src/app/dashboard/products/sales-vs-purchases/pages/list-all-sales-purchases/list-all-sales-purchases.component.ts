import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../../interfaces/Product';
import { SuperCategory } from '../../../interfaces/SuperCategory';
import { ProductUnitsService } from '../../../services/product-units.service';
import { ProductService } from '../../../services/product.service';
import { SuperCategoryService } from '../../../services/super-category.service';

@Component({
  selector: 'app-list-all-sales-purchases',
  templateUrl: './list-all-sales-purchases.component.html',
  styleUrls: ['./list-all-sales-purchases.component.scss']
})
export class ListAllSalesPurchasesComponent implements OnInit {

  public products: Product[] = [];
  public superCategories: SuperCategory[] = [];
  public dataSource: MatTableDataSource<Product>;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  constructor(
    private productService: ProductService,
    private produtcUnitsService: ProductUnitsService,
    private superCategoryService: SuperCategoryService,
    private sweetAlert: SweetAlertService
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.loadProducts();
    this.loadSupercategories();
  }

  loadProducts(category?: string, limit?: number, from?: number): void
  {
    this.productService.getAllProducts( 'spirit', undefined, 1000, 0 )
    .subscribe(
      res => {
        this.products = res.products;        
        // console.log("productos: ", this.products)
        this.length = res.total;
        this.dataSource.data = this.products;
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  loadSupercategories()
  {
    this.superCategoryService.getAllSuperCategories().subscribe(
      res => {
        this.superCategories = res.superCategories;
        console.log("Supercategorias: ", this.superCategories);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProductData( product: Product )
  {
    console.log(product);
    const {id = '', providers, ...productData}= product;    
    productData.category = product.category._id;
    productData.unit = product.unit._id;
    productData.establishment = product.establishment._id;

    console.log("productData: ", productData);

    this.productService.updateProduct( id, productData, productData.supercategory ).subscribe(
      res => {
        this.sweetAlert.presentSuccess( 'Producto Actualizado Correctamente' );
      },
      error => {
        this.sweetAlert.presentError(error.error.error)
      }
    );
  }

  getfullProductName(product: Product): string
  {
    return this.produtcUnitsService.getfullProductName( product );
  } 

}
