import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movement } from '../interfaces/Movement';
import { ResponseGetAllMovements } from '../interfaces/ResponseGetAllMovements';

@Injectable({
  providedIn: 'root'
})
export class MovementService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Crear un movimiento (Entrada o salida de dinero)
   * @param movement 
   * @returns 
   */
   createMovement( movement: Movement ): Observable<Movement>
   {
     return this.http.post<Movement>(`${environment.API_URL}/movements`, movement);
   }
 
   /**
    * Obtiene todos los movimientos registrados (Entrada o salida de dinero)
    * @param type 
    * @param limit 
    * @param from 
    * @returns 
    */
   getAllMovements( type?: string, limit?: number, from?: number ): Observable<ResponseGetAllMovements>
   {
     const httpOptions = {
       params: new HttpParams().set('type', type ? type : '')
                               .set('limit', limit ? limit : 8)
                               .set('from', from ? from : 0)
     };
 
     return this.http.get<ResponseGetAllMovements>(`${environment.API_URL}/movements`, httpOptions);
   }
 
  //  /**
  //   * Obtiene un cliente en especifico.
  //   * @param id 
  //   * @returns 
  //   */
  //  getClientById( id: string ): Observable<Client>
  //  {
  //    return this.http.get<Client>(`${environment.API_URL}/clients/${id}`);
  //  }
 
  //  /**
  //   * Actualiza la información de un cliente
  //   * @param client 
  //   * @returns 
  //   */
  //  updateClient( client: Client ): Observable<Client>
  //  {
  //    return this.http.put<Client>(`${environment.API_URL}/clients/${client.id}`, client);
  //  }
 
  //  /**
  //   * Eliminar un cliente en especifico.
  //   * @param client 
  //   * @returns 
  //   */
  //  deleteClient( client: Client ): Observable<Client>
  //  {
  //    return this.http.delete<Client>(`${environment.API_URL}/clients/${client.id}`);
  //  }

}
