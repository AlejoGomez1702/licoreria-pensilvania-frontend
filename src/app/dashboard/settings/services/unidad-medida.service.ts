import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../interfaces/unidad-medida.interface';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  })
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  //All unidaes-medida
  getAllUnidades()
  {
    const httpOptions = {
      params: new HttpParams().set('limit', 10),
      headers: this.headers
    };
    return this.http.get<any>(`${this.apiUrl}/units`, httpOptions);
  }
  //create unidad-medida
  createUnidad( unidad: Unit ): any
  {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.post<Unit>(`${this.apiUrl}/units`, unidad, httpOptions);
  }
  //edit unidad medida
  updateUnidad(unidad: Unit) {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.put<Unit>(
      `${environment.API_URL}/units/${unidad.id}`,unidad, httpOptions
    );
  }
  //delete unidad by Id
  deleteUnidad( id: string )
  {
   const httpOptions = {
     headers: this.headers
   };
   return this.http.delete<Unit>(`${this.apiUrl}/units/${id}`, httpOptions);
  }

}
