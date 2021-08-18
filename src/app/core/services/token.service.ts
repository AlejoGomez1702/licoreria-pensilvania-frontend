import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService 
{
  
  constructor() { }

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

}
