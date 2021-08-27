import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';
import { ResponseGetAllProducts } from '../interfaces/ResponseGetAllProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductService 
{
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  })
  
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

  // /**
  //  * Crea una categoría de productos en la base de datos.
  //  * @param name Nombre de la categoría.
  //  */
  // createCategory( name: string ): Observable<Category>
  // {
  //   const data = { name };
  //   const httpOptions = {
  //     headers: this.headers
  //   };

  //   return this.http.post<Category>(`${this.apiUrl}/categories`, data, httpOptions);
  // }

  // /**
  //  * Actualiza una categoría de productos en la base de datos.
  //  * @param uid Identificador de la categoría.
  //  */
  //  updateCategory( uid: string, category: Category ): Observable<Category>
  //  {
  //    const { id, state, ...data } = category;
  //    const httpOptions = {
  //      headers: this.headers
  //    };

  //    return this.http.put<Category>(`${this.apiUrl}/categories/${uid}`, data, httpOptions);
  //  }

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
