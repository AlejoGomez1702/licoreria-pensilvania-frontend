import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/LoginData';
import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Inicia sesión en el backend del sistema.
   * @param data Información requerida para hacer login
   */
  login(data: LoginData): Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data);
  }
}
