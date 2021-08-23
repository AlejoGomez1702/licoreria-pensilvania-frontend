import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  });
  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  getLoggedUser() {
    const httpOptions = {
      params: new HttpParams().set('limit', 10),
      headers: this.headers
    };
    return this.http.get<any>(
      `${this.apiUrl}/auth/me`, httpOptions
    )
  }
}
