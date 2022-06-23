import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Client } from 'src/app/dashboard/clients/interfaces/Client';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { ResponseGetAllProducts } from 'src/app/dashboard/products/interfaces/ResponseGetAllProducts';
import { Provider } from 'src/app/dashboard/providers/interfaces/Provider';
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

  searchProductByBarcode( barcode: string ): Observable<Product>
  {
    return this.http.get<Product>( `${environment.API_URL}/searchs/products/barcode/${barcode}`);
  }

  /**
   * Buscar Clientes por número de cédula o nit
   * @param term coindicencia de cédula o NIT
   * @returns 
   */
  searchClientsByDni( term: string ): Observable<Client[]>
  {
    return this.http.get<Client[]>(`${environment.API_URL}/searchs/clients/${term}`);
  }

  /**
   * Buscar Proveedores por número de cédula o nit
   * @param term coincidencia de cédula o NIT
   * @returns 
   */
   searchProvidersByName( term: string ): Observable<Provider[]>
   {
     return this.http.get<Provider[]>(`${environment.API_URL}/searchs/providers/${term}`);
   }


}
