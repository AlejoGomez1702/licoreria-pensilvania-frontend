import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { ResponseGetAllSpirits } from '../interfaces/ResponseGetAllSpirits';
import { Spirit } from '../interfaces/Spirit';

@Injectable({
  providedIn: 'root'
})
export class SpiritService 
{
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  });

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
   * Obtiene todas los productos del tipo licor.
   * @returns Todos los productos (licores).
   */
   getAllProducts( category?: string, limit?: number, from?: number, publicData?: boolean ): Observable<ResponseGetAllSpirits>
   {
     const httpOptions = {
       params: new HttpParams().set('category', category ? category : '')
                               .set('limit', limit ? limit : 1000)
                               .set('from', from ? from : 0)
     };
 
     return this.http.get<ResponseGetAllSpirits>(`${this.apiUrl}/spirits`, httpOptions);
   }

   /**
   * Obtiene un licor en especifico
   */
    getSpiritById( id: string ): Observable<Spirit>
    {
      const httpOptions = {
        headers: this.headers
      };
  
      return this.http.get<Spirit>(`${this.apiUrl}/spirits/${id}`, httpOptions);
    }
 
   /**
    * Obtiene todas las caracteristicas registradas en los productos existentes
    * @returns 
    */
   getAllFeatures(): Observable<{ features: string[]; }>
   {
     const httpOptions = {
       headers: this.headers
     };
 
     return this.http.get<{ features: string[]; }>(`${this.apiUrl}/spirits/all/features`, httpOptions);
   }
 
   /**
    * Crea un producto en la base de datos del tipo licor.
    * @param product 
    */
   createProduct( product: Spirit ): Observable<Spirit>
   {
     const httpOptions = {
       headers: new HttpHeaders({
         'x-token': this.tokenService.getToken()
       })
     };
 
     const { img, ...productData } = product;
     const productDataAny: any = { ...productData };
     // console.log(productDataAny);
     const formData: FormData = new FormData();
     formData.append('img', img);
     let data;
     for (const key in productDataAny) 
     {
       data = productDataAny[key];
       if(data === null)
         data = 0;
       // const data = productData.key;
       formData.append(key, data);       
     }
 
     return this.http.post<Spirit>(`${this.apiUrl}/spirits`, formData, httpOptions);
   }
 
   /**
    * Actualiza un producto en la base de datos.
    * @param uid Identificador de la categoría.
    */
    updateSpirit( product: Spirit ): Observable<Spirit>
    {
      console.log('El licor es: ');
      console.log(product);

      const { id, state, ...data } = product;
      let httpOptions = {
        headers: this.headers
      };

      const { img } = data;
      console.log( img );
      if( typeof img === 'string' || img instanceof String ) //La imagen no se desea actualizar
      {
        console.log("se detecta de tipo stringgg");
        return this.http.put<Spirit>(`${this.apiUrl}/spirits/${id}`, data, httpOptions);
      }

      const httpOptions2 = {
        headers: new HttpHeaders({
          'x-token': this.tokenService.getToken()
        })
      };

      const imgFile = data.img;

      const productDataAny: any = { ...data };
      // console.log(productDataAny);
      const formData: FormData = new FormData();
      // formData.append('img', imgFile);
      let dataWithFile;
      for (const key in productDataAny) 
      {
        dataWithFile = productDataAny[key];
        if(data === null)
          dataWithFile = 0;
        // const data = productData.key;
        formData.append(key, dataWithFile);       
      }
 
      return this.http.put<Spirit>(`${this.apiUrl}/spirits/${id}`, formData, httpOptions2);
    }

}
