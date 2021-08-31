import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { ResponseGetAllProducts } from 'src/app/dashboard/products/interfaces/ResponseGetAllProducts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService 
{
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  })

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) 
  { }

  getProducts( term: string ): Observable<ResponseGetAllProducts>
  {
    const httpOptions = {
      headers: this.headers
    };

    return this.http.get<ResponseGetAllProducts>(`${this.apiUrl}/searchs/products/${term}`, httpOptions);
  }


}
