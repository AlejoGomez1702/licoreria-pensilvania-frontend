import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SaleItem } from 'src/app/dashboard/sales/interfaces/SaleItem';
import { appRoutes } from 'src/app/routes/app-routes';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CartLicoreriaService } from '../../services/cart-licoreria.service';

@Component({
  selector: 'app-fab-cart',
  templateUrl: './fab-cart.component.html',
  styleUrls: ['./fab-cart.component.scss']
})
export class FabCartComponent implements OnInit 
{
  @Output() resetCart: EventEmitter<any> = new EventEmitter();
  @Input() totalItems = 0;
  public products: SaleItem[] = [];

  constructor(
    private cartLicoreriaService: CartLicoreriaService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.products = this.cartLicoreriaService.getCart();
  }

  getfullProductName(product: SaleItem): string
  {
    return `${product.product.category.name} ${product.product.name}`;
  }

  getCartTotal(): string
  {
    let total = 0;

    for (const product of this.products) 
    {
      total += (product.count * product.sale_price);      
    }

    return `${total}`;
  }

  async removeCart()
  {
    const { isConfirmed } = await this.sweetAlert.presentDelete('Su Carrito de Compras');
    if( isConfirmed )
    {
      this.cartLicoreriaService.clearCart();
      this.resetCart.emit();
    }
  }

  goToShoppingCart()
  {
    this.router.navigate([appRoutes.shoppingCart]);
  }

}
