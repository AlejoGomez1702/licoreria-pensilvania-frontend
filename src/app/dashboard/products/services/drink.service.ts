import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGetAllDrinks } from '../interfaces/ResponseGetAllDrinks';

@Injectable({
  providedIn: 'root'
})
export class DrinkService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todas los productos del tipo licor.
   * @returns Todos los productos (licores).
   */
   getAllProducts( category?: string, limit?: number, from?: number ): Observable<ResponseGetAllDrinks>
   {
    //  const httpOptions = {
    //    params: new HttpParams().set('category', category ? category : '')
    //                            .set('limit', limit ? limit : 8)
    //                            .set('from', from ? from : 0)
    //  };
 
     return this.http.get<ResponseGetAllDrinks>(`${environment.API_URL}/drinks`);
   }

}
