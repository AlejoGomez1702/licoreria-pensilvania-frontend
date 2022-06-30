import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../../interfaces/Product';
import { QueryGetAllProducts } from '../../../interfaces/QueryGetAllProducts';
import { SuperCategory } from '../../../interfaces/SuperCategory';
import { ProductUnitsService } from '../../../services/product-units.service';
import { ProductService } from '../../../services/product.service';
import { SuperCategoryService } from '../../../services/super-category.service';

@Component({
  selector: 'app-list-all-sales-purchases',
  templateUrl: './list-all-sales-purchases.component.html',
  styleUrls: ['./list-all-sales-purchases.component.scss']
})
export class ListAllSalesPurchasesComponent implements OnInit 
{
  public superCategorySelected = new FormControl('spirit');
  public products: Product[] = [];
  public superCategories: SuperCategory[] = [];

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  // Query enviada al backend
  public query: QueryGetAllProducts = {
    supercategory: 'spirit',
    category: '',
    onlyWithPriceProblems: false,
    limit: 1000,
    from: 0
  };

  constructor(
    private productService: ProductService,
    private produtcUnitsService: ProductUnitsService,
    private superCategoryService: SuperCategoryService,
    private sweetAlert: SweetAlertService
  ) 
  {  }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.loadProducts();
    this.loadSupercategories();

    // Escuchando cambios en la supercategoria
    this.superCategorySelected.valueChanges.subscribe(
      selected => {
        const mathcType = this.superCategoryService.matchIdWithName( selected );  
        this.query.supercategory = mathcType;        
        this.loadProducts();
      }
    );
  }

  loadProducts(): void
  {
    const query = this.query;

    this.productService.getAllProducts( query )
    .subscribe(
      res => {
        this.products = res.products;        
        this.length = res.total;
        console.log("products: ", this.products);
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  loadSupercategories()
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

  // 1. PrecioCompra > PrecioVenta: Se esta llendo a perdidas el producto
  // 2. precioCompra > PrecioVentaSecundario: Se esta llendo a perdidas el producto
  // 3. compra || venta no estan establecidas
  getProductMessage( product: Product ): string
  {
    const { purchase_price, sale_price, second_sale_price } = product;
    if(
      (purchase_price > sale_price) || 
      // (purchase_price > second_sale_price)  ||
      (purchase_price <= 1) ||
      (sale_price <= 1)
    )
    {
      return 'Revisar Precios';
    }

    return '';
  }

  printErrorField( product: Product): string
  {
    if( product.sale_price <= 1 )
    {
      return 'ng-invalid ng-dirty';
    }

    return '';
  }


  selectProductsWithProblems()
  {
    this.query.onlyWithPriceProblems = !this.query.onlyWithPriceProblems;
    this.loadProducts();
  }

}
