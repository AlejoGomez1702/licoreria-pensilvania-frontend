import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { Spirit } from '../../products/interfaces/Spirit';

@Injectable({
  providedIn: 'root'
})
export class SaleService 
{
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'x-token': this.tokenService.getToken()
  });


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) 
  { }

  // searchProductByBarcode( barcode: string ): Observable<Spirit>
  // {
  //   const httpOptions = {
  //     headers: this.headers
  //   };

  //   return this.http.get<Spirit>( `${this.apiUrl}/searchs/products/barcode/${barcode}`, httpOptions );
  // }


}
