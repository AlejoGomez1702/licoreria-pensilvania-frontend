import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/LoginData';
import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
   * Inicia sesión en el backend del sistema.
   * @param data Información requerida para hacer login (mail || username) && password
   */
  login(data: LoginData): Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>(`${environment.API_URL}/auth/login`, data);
  }

  /**
   * Obtiene el usuario logueado en el sistema
   */
  getUserLogued(): Observable<LoginResponse>
  {
    return this.http.get<LoginResponse>(`${environment.API_URL}/auth/me`);
  }

  /**
   * Verifica si hay un usuario logueado o no en el sistema.
   */
  verifyAuth(): Observable<boolean>
  {
    if( !this.tokenService.getToken() )
    {
      return of( false );
    }

    return this.getUserLogued().pipe(
      map( auth => {
        if( auth )
        {
          return true;
        }

        return false;
      })
    );
  }

  verifyRol( rol: string ): Observable<boolean>
  {
    if( !this.tokenService.getToken() )
    {
      return of( false );
    }

    return this.getUserLogued().pipe(
      map( auth => {
        if( auth && auth.user.rol === rol )
        {
          return true;
        }

        return false;
      })
    );
  }

}
