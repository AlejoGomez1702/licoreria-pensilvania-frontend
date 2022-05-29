import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../interfaces/Product';
import { ResponseGetAllProducts } from '../../interfaces/ResponseGetAllProducts';

@Injectable({
  providedIn: 'root'
})
export class GroceryService 
{
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todas los productos del tipo comestible.
   * @returns Todos los productos (comestibles).
   */
  getAllProducts( category?: string, limit?: number, from?: number ): Observable<ResponseGetAllProducts>
  {
    const httpOptions = {
      params: new HttpParams().set('category', category ? category : '')
                              .set('limit', limit ? limit : 8)
                              .set('from', from ? from : 0)
    };

    return this.http.get<ResponseGetAllProducts>(`${environment.API_URL}/groceries`, httpOptions);
  }

  /**
   * Obtiene un comestible en especifico
   */
   getGroceryById( id: string, sercheable: boolean ): Observable<Product>
   {
     let httpOptions = {};

     if(sercheable)
     {
       httpOptions = {
         params: new HttpParams().set('sercheable', true)
       };
     }

     return this.http.get<Product>(`${environment.API_URL}/groceries/${id}`, httpOptions);
   }

  /**
    * Crea un producto en la base de datos del tipo coestible.
    * @param product 
  */
   createProduct( product: Product ): Observable<Product>
   { 
     const { img, ...productData } = product;
     const productDataAny: any = { ...productData };
 
     // Si no se envia la imagen se hace en formato JSON
     // de lo contrario se crea un FormData:
     if( img === null )
     {
       return this.http.post<Product>(`${environment.API_URL}/groceries`, productDataAny);
     }
     
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
 
     // Con esta cabecera indico al interceptor que va un archivo en la petición
     const headers = new HttpHeaders().set('with-img', 'yes');
 
     return this.http.post<Product>(`${environment.API_URL}/groceries`, formData, { headers });
   }

  /**
    * Actualiza un producto en la base de datos.
    * @param id Identificador del product.
    */
   updateGrocery( id: string, product: Product ): Observable<Product>
   {
     const { state, ...data } = product;

     const { img } = data;
     if( typeof img === 'string' || img instanceof String || img === null ) //La imagen no se desea actualizar
     {
       return this.http.put<Product>(`${environment.API_URL}/groceries/${id}`, data);
     }

     const productDataAny: any = { ...data };
     const formData: FormData = new FormData();
     let dataWithFile;
     for (const key in productDataAny) 
     {
       dataWithFile = productDataAny[key];
       if(data === null)
         dataWithFile = 0;
       formData.append(key, dataWithFile);       
     }

     // Con esta cabecera indico al interceptor que va un archivo en la petición
     const headers = new HttpHeaders().set('with-img', 'yes');

     return this.http.put<Product>(`${environment.API_URL}/groceries/${id}`, formData, { headers });
   }

   /**
   * Elimina un comestible del sistema.
   * @param id 
   */
    deleteGrocery( id: string ): Observable<Product>
    {
      return this.http.delete<Product>(`${environment.API_URL}/groceries/${id}`);
    }
  
}
