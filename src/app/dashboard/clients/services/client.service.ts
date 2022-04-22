import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGetAllClients } from '../interfaces/ResponseGetAllClients';

@Injectable({
  providedIn: 'root'
})
export class ClientService 
{

  constructor(
    private http: HttpClient
  ) 
  { }

  /**
   * Obtiene todas los clientes registrados en un negocio.
   * @returns Todos los clientes.
  */
   getAllClients( category?: string, limit?: number, from?: number ): Observable<ResponseGetAllClients>
   {
     const httpOptions = {
       params: new HttpParams().set('category', category ? category : '')
                               .set('limit', limit ? limit : 8)
                               .set('from', from ? from : 0)
     };
 
     return this.http.get<ResponseGetAllClients>(`${environment.API_URL}/clients`, httpOptions);
   }

}
