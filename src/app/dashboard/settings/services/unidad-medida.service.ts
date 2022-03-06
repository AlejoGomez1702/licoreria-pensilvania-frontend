import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseGetAllUnits, Unit } from '../interfaces/unidad-medida.interface';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todas las unidades de medida de una supercategoria o todas en general
   * @param supercategory "spirit" | 
   * @returns Unidades de medida
   */
  getAllUnidades( supercategory?: string ): Observable<ResponseGetAllUnits>
  {
    const httpOptions = {
      params: new HttpParams()
                              // .set('limit', 1000)
                              .set('supercategory', supercategory || '')
    };

    return this.http.get<ResponseGetAllUnits>(`${environment.API_URL}/units`, httpOptions);
  }

  //create unidad-medida
  createUnidad( unidad: Unit ): any
  {
    return this.http.post<Unit>(`${environment.API_URL}/units`, unidad);
  }

  //edit unidad medida
  updateUnidad(unidad: Unit) {
    return this.http.put<Unit>(
      `${environment.API_URL}/units/${unidad.id}`,unidad);
  }

  //delete unidad by Id
  deleteUnidad( id: string )
  {
   return this.http.delete<Unit>(`${environment.API_URL}/units/${id}`);
  }

}
