import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  constructor(
    private http: HttpClient,
  ) 
  { }

  getLoggedUser() 
  {
    return this.http.get<any>(`${environment.API_URL}/auth/me`)
  }
}
