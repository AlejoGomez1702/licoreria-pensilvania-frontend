import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGetAllSuperCategories } from '../interfaces/ResponseGetAllSuperCategories';

@Injectable({
  providedIn: 'root'
})
export class SuperCategoryService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todas las supercategorias.
   * @returns Todos las supercategorias.
    */
  getAllSuperCategories(): Observable<ResponseGetAllSuperCategories>
  {
    return this.http.get<ResponseGetAllSuperCategories>(`${environment.API_URL}/supercategories`);
  }

}
