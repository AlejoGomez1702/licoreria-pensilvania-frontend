import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { CartItem } from 'src/app/dashboard/sales/interfaces/CartItem';

@Component({
  selector: 'app-create-purchases',
  templateUrl: './create-purchases.component.html',
  styleUrls: ['./create-purchases.component.scss']
})
export class CreatePurchasesComponent implements OnInit 
{
  // Lo ingresado en la barra de busqueda (Código de barras || nombre del producto)
  public search: string = '';

  // Productos agregados a la venta.
  public products: CartItem[] = [];
  // Poductos resultados de una busqueda.
  public filteredProducts: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  finishPurchase()
  {

  }

  get isEmpty()
  {
    return true;
  }

  searchProduct()
  {

  }

  clearSearchData()
  {

  }

  searchById( id: string )
  {
    
  }

}
