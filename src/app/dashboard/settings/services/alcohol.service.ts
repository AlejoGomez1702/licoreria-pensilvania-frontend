import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alcohol } from '../interfaces/alcohol.interface';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AlcoholService {

  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  })
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  //All alcohol
  getAllAlcohol()
  {
    const httpOptions = {
      params: new HttpParams().set('limit', 100),
      headers: this.headers
    };
    return this.http.get<any>(`${this.apiUrl}/alcohols`, httpOptions);
  }
  //create alcohol
  createAlcohol( alcohol: Alcohol ): any
  {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.post<Alcohol>(`${this.apiUrl}/alcohols`, alcohol, httpOptions);
  }
  //edit alcohol
  updateAlcohol(alcohol: Alcohol) {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.put<Alcohol>(
      `${environment.API_URL}/alcohols/${alcohol.id}`,alcohol, httpOptions
    );
  }
  //delete unidad by Id
  deleteAlcohol( id: string )
  {
   const httpOptions = {
     headers: this.headers
   };
   return this.http.delete<Alcohol>(`${this.apiUrl}/alcohols/${id}`, httpOptions);
  }

}
