import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService 
{
  
  constructor() { }

  /**
   * Obtiene el token almacenado en el localstorage o devuelve cadena vacia si no se encuentra.
   * @returns Token de autenticación.
   */
  getToken(): string
  {
    let token = '';
    const existToken = localStorage.getItem('x-token');
    if(existToken)
    {
      token = existToken;
    }

    return token;
  }

  /**
   * Limpia los registros del localstorage de un usuario al que le expiró la sesión.
   */
  clearToken(): void
  {
    localStorage.clear();
  }

}
