import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaleItem } from '../../sales/interfaces/SaleItem';
import { Purchase } from '../interfaces/Purchase';
import { ResponseGetAllPurchases } from '../interfaces/ResponseGetAllPurchases';

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
   createPurchase( purchase: SaleItem[], providerId: string ): Observable<Purchase>
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

     let data;
     if( providerId )
     {
       data = { products, providerId };
     }
     else
     {
       data = { products };
     }
 
     return this.http.post<Purchase>(`${environment.API_URL}/purchases`, data);
   }

  /**
   * Obtiene todas las compras del negocio del usuario logueado.
   * @returns Todas las compras.
   */
   getAllPurchases( limit?: number, from?: number ): Observable<ResponseGetAllPurchases>
   {
     const httpOptions = {
       params: new HttpParams().set('limit', limit ? limit : 8)
                               .set('from', from ? from : 0)
     };
 
     return this.http.get<ResponseGetAllPurchases>(`${environment.API_URL}/purchases`, httpOptions);
   }

  /**
   * Obtiene una compra especifica
  */
   getPurchaseById( id: string ): Observable<Purchase>
   {
     return this.http.get<Purchase>(`${environment.API_URL}/purchases/${id}`);
   }

}
