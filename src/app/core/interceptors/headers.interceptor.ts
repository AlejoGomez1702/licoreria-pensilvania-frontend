import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor 
{
  constructor(
    private tokenService: TokenService
  ) 
  {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'x-token': this.tokenService.getToken()
    });

    const reqClone = request.clone({
      headers
    });

    return next.handle( reqClone );
  }
}
