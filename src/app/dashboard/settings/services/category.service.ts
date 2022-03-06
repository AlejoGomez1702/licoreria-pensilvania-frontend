import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ResponseGetAllCategories } from '../interfaces/category.interfaces';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService 
{

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
   * Obtiene todas las categorias de productos de la base de datos.
   * @param supercategory "spirit" | 
   * @returns Todas las categorias de productos.
   */
  getAllCategories( supercategory?: string ): Observable<ResponseGetAllCategories>
  {
    const httpOptions = {
      params: new HttpParams()
                              // .set('limit', 1000)
                              .set('supercategory', supercategory || '')
    };

    return this.http.get<ResponseGetAllCategories>(`${environment.API_URL}/categories`, httpOptions);
  }

  /**
   * Crea una categoría de productos en la base de datos.
   * @param name Nombre de la categoría.
   */
  createCategory( name: string ): Observable<Category>
  {
    const data = { name };

    return this.http.post<Category>(`${environment.API_URL}/categories`, data);
  }

  /**
   * Actualiza una categoría de productos en la base de datos.
   * @param uid Identificador de la categoría.
   */
   updateCategory( uid: string, category: Category ): Observable<Category>
   {
     const { id, state, ...data } = category;
     return this.http.put<Category>(`${environment.API_URL}/categories/${uid}`, data);
   }

   /**
    * Elimina una categoría de la base de datos.
    * @param id Identificado único de la categoria.
    */
   deleteCategory( id: string )
   {
    return this.http.delete<Category>(`${environment.API_URL}/categories/${id}`);
   }
}
