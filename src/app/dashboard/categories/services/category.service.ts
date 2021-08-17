import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseGetAllCategories } from '../interfaces/category.interfaces';

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
    return this.http.get<ResponseGetAllCategories>(this.apiUrl);
  }
}
