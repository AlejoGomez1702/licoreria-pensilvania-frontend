import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { Provider } from '../interfaces/provider.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  });

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  getAllProviders() {
    const httpOptions = {
      params: new HttpParams().set('limit', 10),
      headers: this.headers
    };
    return this.http.get<any>(`${this.apiUrl}/providers`, httpOptions);
  }

  createProvider( provider: Provider ): any
  {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.post<Provider>(`${this.apiUrl}/providers`, provider, httpOptions);
  }

  updateProvider(provider: Provider) {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.put<Provider>(
      `${environment.API_URL}/providers/${provider.id}`,provider, httpOptions
    );
  }

  deleteProvider( id: string )
  {
   const httpOptions = {
     headers: this.headers
   };
   return this.http.delete<Provider>(`${this.apiUrl}/providers/${id}`, httpOptions);
  }
}
