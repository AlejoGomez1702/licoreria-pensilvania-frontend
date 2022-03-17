import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../sales/interfaces/CartItem';
import { Purchase } from '../interfaces/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService 
{

  constructor(
    private http: HttpClient
  ) 
  { }

  /**
   * Crear una nueva compra en la base de datos
   * @param purchase
   * @returns 
   */
   createPurchase(purchase: CartItem[]): Observable<Purchase>
   {
     const products = purchase.map(p => {
       return {
         count: p.count,
         purchase_price: p.purchase_price,
         sale_price: p.sale_price,
         product: p.product.id,
         product_name: p.product_name
       };
     });
     const data = { products };
 
     return this.http.post<Purchase>(`${environment.API_URL}/purchases`, data);
   }

}
