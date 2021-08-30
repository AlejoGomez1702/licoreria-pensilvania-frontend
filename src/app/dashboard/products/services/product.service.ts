import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';
import { ResponseGetAllProducts } from '../interfaces/ResponseGetAllProducts';
import { Product } from '../interfaces/Product';

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
   * Obtiene todas los productos
   * @returns Todos los productos.
   */
  getAllProducts(): Observable<ResponseGetAllProducts>
  {
    const httpOptions = {
      params: new HttpParams().set('limit', 10),
      headers: this.headers
    };

    return this.http.get<ResponseGetAllProducts>(`${this.apiUrl}/products`, httpOptions);
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

    return this.http.get<{ features: string[]; }>(`${this.apiUrl}/products/all/features`, httpOptions);
  }

  /**
   * Crea un producto en la base de datos.
   * @param product 
   */
  createProduct( product: Product ): Observable<Product>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': this.tokenService.getToken()
      })
    };

    // const productObj: any = { ...product };
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

    console.log(productDataAny);

    return this.http.post<Product>(`${this.apiUrl}/products`, formData, httpOptions);
  }

  /**
   * Actualiza un producto en la base de datos.
   * @param uid Identificador de la categoría.
   */
   updateProduct( product: Product ): Observable<Product>
   {
     const { id, state, ...data } = product;
     const httpOptions = {
       headers: this.headers
     };

     return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data, httpOptions);
   }

  //  /**
  //   * Elimina una categoría de la base de datos.
  //   * @param id Identificado único de la categoria.
  //   */
  //  deleteCategory( id: string )
  //  {
  //   const httpOptions = {
  //     headers: this.headers
  //   };

  //   return this.http.delete<Category>(`${this.apiUrl}/categories/${id}`, httpOptions);
  //  }
}
