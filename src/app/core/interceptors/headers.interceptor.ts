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
    let headers;
    const hasImage: boolean = request.headers.get('with-img') === 'yes';

    if( hasImage )
    {
      // Petición cuando hay archivos(imagenes) en la request
      headers = new HttpHeaders({
        'x-token': this.tokenService.getToken()
      });   
    }
    else
    {
      headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.tokenService.getToken()
      });
    }

    const reqClone = request.clone({
      headers
    });

    return next.handle( reqClone );
  }
}
