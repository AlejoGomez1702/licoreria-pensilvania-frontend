import { Injectable } from '@angular/core';
import { QueryGetAllProducts } from '../interfaces/QueryGetAllProducts';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductFrontendService 
{

  constructor(
    private productService: ProductService
  ) { }

  loadProducts( queryGetAllProducts: QueryGetAllProducts )
  {
    // this.productService.getAllProducts( queryGetAllProducts )
    // .subscribe(
    //   res => {
    //     this.products = res.products;        
    //     // console.log("productos: ", this.products)
    //     this.length = res.total;
    //     this.dataSource.data = this.products;
    //   },
    //   error => this.sweetAlert.presentError(error.error.error)
    // );
  }

}
