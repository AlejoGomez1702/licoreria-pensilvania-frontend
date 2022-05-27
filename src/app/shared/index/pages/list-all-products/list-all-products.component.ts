import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { CartItem } from 'src/app/dashboard/sales/interfaces/CartItem';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { FabCartComponent } from '../../components/fab-cart/fab-cart.component';
import { CartLicoreriaService } from '../../services/cart-licoreria.service';
import { SpiritsLicoreriaService } from '../../services/spirits-licoreria.service';
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

  // Shopping Cart
  public cartProducts: CartItem[] = [];
  @ViewChild(FabCartComponent) fabCart!: FabCartComponent;

  constructor(
    // private productService: ProductService,
    private cartLicoreriaService: CartLicoreriaService,
    private spiritsLicoreriaService: SpiritsLicoreriaService,
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
    this.cartProducts = this.cartLicoreriaService.getCart();
  }

  resetCart()
  {
    this.cartProducts = this.cartLicoreriaService.getCart();
  }

  loadProducts(category?: string, limit?: number, from?: number): void
  {
    this.spiritsLicoreriaService.getAllSpirits(category, limit, from)
    .subscribe(res => {
      this.products = res.spirits;
      this.length = res.total || 0;
      main();
    },
    error => {
      console.log(error);
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
    // if(filterValue)
    // {
    //   this.filterService.getProducts( filterValue )
    //   .subscribe(res => {
    //     this.products = res.products;
    //     main();
    //   },
    //   error => {
    //     this.sweetAlert.presentError(error.error.error);
    //   });
    // }
  }

  getFullProductName( product: Product ): string
  {
    return '';
  }

  paginateChange( event:PageEvent ): PageEvent
  {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.from = event.pageIndex * this.pageSize;
    this.loadProducts( this.categorySelected, this.pageSize, this.from );

    return event;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  addItemToShoppingCart( product: Product )
  {
    const cartItem = this.productToItemCart( product );
    const indexProduct = this.cartProducts.findIndex( p => p.id === cartItem.id );
    if(indexProduct !== -1)
    {
      this.cartProducts[indexProduct].count ++;
      this.cartLicoreriaService.refreshCart( this.cartProducts );
    }
    else
    {
      this.cartProducts = this.cartLicoreriaService.addItem(cartItem);
    }

    this.fabCart.loadData();
  }

  private productToItemCart(product: Product): CartItem
  {
    const { id = '' } = product;
    return {
              id, 
              product, 
              count: 1, 
              sale_price: product.sale_price,
              purchase_price: product.purchase_price
            };
  }

  get isEmptyCart()
  {
    return this.cartProducts.length === 0;
  }

  get totalItems()
  {
    return this.cartProducts.length;
  }

}
