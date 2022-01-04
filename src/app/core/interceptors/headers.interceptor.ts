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
    const body: FormData = request.body;
    if(body && body.has('img'))
    {
      console.log("SIIIIIIIIIIIIII");
    }

    const { method, url } = request;
    const [ last, secondLast ] = url.split('/').slice(-2);

    // Si se desea crear o actualizar un licor
    const createOrUpdateSpirit: boolean = ((method === 'POST' && (last === 'spirits'  || secondLast === 'spirits')) ||
                                          (method === 'PUT' && secondLast === 'spirits'));

    const hasImage: boolean = (body && body.has('img')) === true;


    // console.log("Metodo: ", method, "  last: ", last, "  secondlast: ", secondLast);
    // console.log("Create or update: ", createOrUpdateSpirit, "  has image: ", hasImage);

    /*
     * Si es POST y termina en spirits y tiene el campo img -> el formulario envia una imagen 
     * por eso no se debe enviar content-type
     */
    if( 
      createOrUpdateSpirit && 
      hasImage // Tiene una imagen en la petición.
    )
    {
      // console.log("yuuujuuuuuuuuuuuuuuuuuu")
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
