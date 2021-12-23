import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { CartItem } from '../interfaces/CartItem';
import { Sale } from '../interfaces/Sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService 
{

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) 
  { }

  createSale(sale: CartItem[]): Observable<Sale>
  {
    const products = sale.map(p => {
      return {
        count: p.count,
        purchase_price: p.purchase_price,
        sale_price: p.sale_price,
        product: p.product.id
      };
    });
    const data = { products };

    return this.http.post<Sale>(`${environment.API_URL}/sales`, data);
  }


}
