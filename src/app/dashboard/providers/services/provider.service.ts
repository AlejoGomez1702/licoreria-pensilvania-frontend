import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provider } from '../interfaces/Provider';
import { ResponseGetAllProviders } from '../interfaces/ResponseGetAllProviders';

@Injectable({
  providedIn: 'root'
})
export class ProviderService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Registrar un nuevo proveedor en el sistema.
   * @param provider 
   * @returns 
   */
  createProvider( provider: Provider ): Observable<Provider>
  {
    return this.http.post<Provider>(`${environment.API_URL}/providers`, provider);
  }

  /**
   * Obtiene todas los proveedores registrados en un negocio.
   * @returns Todos los proveedores.
  */
  getAllProviders( category?: string, limit?: number, from?: number ): Observable<ResponseGetAllProviders>
  {
    const httpOptions = {
      params: new HttpParams().set('category', category ? category : '')
                              .set('limit', limit ? limit : 8)
                              .set('from', from ? from : 0)
    };

    return this.http.get<ResponseGetAllProviders>(`${environment.API_URL}/providers`, httpOptions);
  }

  /**
   * Actualiza la información de un provider
   * @param provider
   * @returns 
   */
  updateProvider( provider: Provider ): Observable<Provider>
  {
    return this.http.put<Provider>(`${environment.API_URL}/providers/${provider.id}`, provider);
  }

  /**
   * Eliminar un proveedor en especifico.
   * @param provider 
   * @returns 
   */
  deleteProvider( provider: Provider ): Observable<Provider>
  {
    return this.http.delete<Provider>(`${environment.API_URL}/providers/${provider.id}`);
  }
}
