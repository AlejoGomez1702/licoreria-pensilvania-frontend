import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/Client';
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
   * Crear un nuevo cliente en el negocio.
   * @param client 
   * @returns 
   */
  createClient( client: Client ): Observable<Client>
  {
    return this.http.post<Client>(`${environment.API_URL}/clients`, client);
  }

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

  /**
   * Obtiene un cliente en especifico.
   * @param id 
   * @returns 
   */
  getClientById( id: string ): Observable<Client>
  {
    return this.http.get<Client>(`${environment.API_URL}/clients/${id}`);
  }

  /**
   * Actualiza la información de un cliente
   * @param client 
   * @returns 
   */
  updateClient( client: Client ): Observable<Client>
  {
    return this.http.put<Client>(`${environment.API_URL}/clients/${client.id}`, client);
  }

  /**
   * Eliminar un cliente en especifico.
   * @param client 
   * @returns 
   */
  deleteClient( client: Client ): Observable<Client>
  {
    return this.http.delete<Client>(`${environment.API_URL}/clients/${client.id}`);
  }

}
