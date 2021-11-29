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
    // console.log(request);

    const { method, url } = request;
    const [ last, secondLast ] = url.split('/').slice(-2);

    // const lastSegmet = url.split('/').slice(-1)[0];

    // const lastSegmets = url.split('/').slice(-2);

    // console.log("last segment", lastSegmets);

    // Si es POST y termina en spirits -> el formulario envia una imagen por eso no se debe enviar content-type
    if(
      (method === 'POST' && last === 'spirits') ||
      (method === 'PUT' && secondLast === 'spirits')
    )
    {
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
