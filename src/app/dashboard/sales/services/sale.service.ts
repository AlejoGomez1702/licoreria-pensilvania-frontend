import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../products/interfaces/Product';
import { CartItem } from '../interfaces/CartItem';
import { RangeDateTime } from '../interfaces/RangeDateTime';
import { ResponseGetAllSales } from '../interfaces/ResponseGetAllSales';
import { Sale } from '../interfaces/Sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService 
{

  constructor(
    private http: HttpClient,
  ) 
  { }

  /**
   * Crear una nueva venta en la base de datos
   * @param sale Venta a crear.
   * @returns 
   */
  createSale(sale: CartItem[], clientId?: string): Observable<Sale>
  {
    const products = sale.map(p => {
      return {
        count: p.count,
        purchase_price: p.purchase_price,
        sale_price: p.sale_price,
        product: p.product.id,
        product_name: p.product_name
      };
    });

    let data;

    if( clientId )
    {
      data = { products, clientId };
    }
    else
    {
      data = { products };
    }

    return this.http.post<Sale>(`${environment.API_URL}/sales`, data);
  }

  /**
   * Obtiene todas las ventas del negocio del usuario logueado.
   * @returns Todas las ventas.
   */
  getAllSales( limit?: number, from?: number, range?: RangeDateTime ): Observable<ResponseGetAllSales>
  {
    let params = new HttpParams().set('limit', limit ? limit : 8)
                                 .set('from', from ? from : 0)
                                 .set('start', range ? range.start.toISOString() : '')
                                 .set('end', range ? range.end.toISOString() : '');                     

    const httpOptions = { params };

    return this.http.get<ResponseGetAllSales>(`${environment.API_URL}/sales`, httpOptions);
  }

  /**
   * Obtiene una venta especifica
  */
  getSaleById( id: string ): Observable<Sale>
  {
    return this.http.get<Sale>(`${environment.API_URL}/sales/${id}`);
  }


}
