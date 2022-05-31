import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';
import { ResponseGetAllProducts } from '../interfaces/ResponseGetAllProducts';
import { Product } from '../interfaces/Product';
import { HttpOptions } from 'src/app/core/interfaces/HttpOptions';

@Injectable({
  providedIn: 'root'
})
export class ProductService 
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
   * Obtiene todos los productos del negocio al que pertenece el usuario logueado.
   * @param supercategory 
   * @param category 
   * @param limit 
   * @param from 
   * @returns 
   */
  getAllProducts( supercategory: string, category?: string, limit?: number, from?: number ): Observable<ResponseGetAllProducts>
  {
    const httpOptions = {
      params: new HttpParams().set('supercategory', supercategory)
                              .set('category', category ? category : '')
                              .set('limit', limit ? limit : 8)
                              .set('from', from ? from : 0)
    };

    return this.http.get<ResponseGetAllProducts>(`${environment.API_URL}/products`, httpOptions);
  }

  /**
   * Obtiene un producto en especifíco 
   * @param id 
   * @param sercheable Productos que un negocio desea registrar y que ya existen en otro negocio.
   * @returns 
   */
  getProductById( id: string, sercheable: boolean ): Observable<Product>
  {
    let httpOptions = {};

    if(sercheable)
    {
      httpOptions = {
        params: new HttpParams().set('sercheable', true)
      };
    }

    return this.http.get<Product>(`${environment.API_URL}/products/${id}`, httpOptions);
  }

  /**
   * Crea un nuevo producto con todos los detalles e imagen opcional.
   * (La imagen se muestra en la tienda virtual)
   * @param product 
   * @returns 
   */
  createProduct( product: Product, supercategory: string ): Observable<Product>
  { 
    const { img, ...productData } = product;
    const productDataAny: any = { ...productData };

    let httpOptions: HttpOptions = {
        params: new HttpParams().set('supercategory', supercategory)
    };

    // Si no se envia la imagen se hace en formato JSON
    // de lo contrario se crea un FormData:
    if( img === null )
    {
      return this.http.post<Product>(`${environment.API_URL}/products`, productDataAny, httpOptions);
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
    httpOptions = {
      params: new HttpParams().set('supercategory', supercategory),
      headers: new HttpHeaders().set('with-img', 'yes')
    };

    return this.http.post<Product>(`${environment.API_URL}/products`, formData, httpOptions);
  }

  /**
   * Actualiza la información de un producto en especifíco
   * @param id 
   * @param product 
   * @returns 
   */  
  updateProduct( id: string, product: Product, supercategory: string ): Observable<Product>
  {
    const { state, ...data } = product;
    let headers = new HttpHeaders().set('supercategory', supercategory);

    const { img } = data;
    if( typeof img === 'string' || img instanceof String || img === null ) //La imagen no se desea actualizar
    {
      return this.http.put<Product>(`${environment.API_URL}/products/${id}`, data, { headers });
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
    headers = new HttpHeaders().set('with-img', 'yes');

    return this.http.put<Product>(`${environment.API_URL}/products/${id}`, formData, { headers });
  }

  /**
   * Elimina un producto especifico registrado previamente en el sistema.
   * @param id 
   * @returns 
   */
  deleteProduct( id: string ): Observable<Product>
  {
    return this.http.delete<Product>(`${environment.API_URL}/products/${id}`);
  }
}
