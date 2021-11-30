import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { ResponseGetAllProducts } from 'src/app/dashboard/products/interfaces/ResponseGetAllProducts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService 
{

  constructor(
    private http: HttpClient
  ) 
  { }

  searchSpirits( term: string, other: boolean ): Observable<Product[]>
  {
    let httpOptions = {};

    if(other) // Si se desea buscar en los productos de los otros negocios
    {
      httpOptions = {
        params: new HttpParams().set('other', true)
      };
    }    

    return this.http.get<Product[]>(`${environment.API_URL}/searchs/spirits/${term}`, httpOptions);
  }

  // getProducts( term: string ): Observable<ResponseGetAllProducts>
  // {
  //   return this.http.get<ResponseGetAllProducts>(`${environment.API_URL}/searchs/products/${term}`);
  // }

  searchProductByBarcode( barcode: string ): Observable<Product>
  {
    return this.http.get<Product>( `${environment.API_URL}/searchs/products/barcode/${barcode}`);
  }


}
