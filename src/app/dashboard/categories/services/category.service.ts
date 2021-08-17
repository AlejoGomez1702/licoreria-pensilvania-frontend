import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ResponseGetAllCategories } from '../interfaces/category.interfaces';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService 
{
  apiUrl = 'http://localhost:9000/api/categories';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todas las categorias de productos de la base de datos.
   * @returns Todas las categorias de productos.
   */
  getAllCategories(): Observable<ResponseGetAllCategories>
  {
    const httpOptions = {
      params: new HttpParams().set('limit', 10)
    };
    return this.http.get<ResponseGetAllCategories>(this.apiUrl, httpOptions);
  }

  /**
   * Crea una categoría de productos en la base de datos.
   * @param name Nombre de la categoría.
   */
  createCategory( name: string ): Observable<Category>
  {
    const data = { name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTFhODFjNmRjMjllNjM0MTQzYzljNzkiLCJpYXQiOjE2MjkyMzk2NjgsImV4cCI6MTYyOTI1NDA2OH0.za00ogAcAJ7s_zxAYyZ_izJrSv5kHbawO1uyL5bO19k'
      })
    };
    return this.http.post<Category>(this.apiUrl, data, httpOptions);
  }

  /**
   * Actualiza una categoría de productos en la base de datos.
   * @param uid Identificador de la categoría.
   */
   updateCategory( uid: string, category: Category ): Observable<Category>
   {
     const { id, state, ...data } = category;
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTFhODFjNmRjMjllNjM0MTQzYzljNzkiLCJpYXQiOjE2MjkyMzk2NjgsImV4cCI6MTYyOTI1NDA2OH0.za00ogAcAJ7s_zxAYyZ_izJrSv5kHbawO1uyL5bO19k'
       })
     };
     return this.http.put<Category>(this.apiUrl + '/' + uid, data, httpOptions);
   }
}
