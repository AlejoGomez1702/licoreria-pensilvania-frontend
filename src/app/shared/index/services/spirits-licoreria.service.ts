import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMainSpirits } from '../interfaces/ResponseMainSpirits';

@Injectable({
  providedIn: 'root'
})
export class SpiritsLicoreriaService 
{

  constructor(
    private http: HttpClient
  ) { }

  getMainSpirits(): Observable<ResponseMainSpirits>
  {
    return this.http.get<ResponseMainSpirits>(`${environment.API_URL}/public/spirits/main`);
  }

  getAllSpirits(category?: string, limit?: number, from?: number): Observable<ResponseMainSpirits>
  {
    const httpOptions = {
      params: new HttpParams().set('category', category ? category : '')
                              .set('limit', limit ? limit : 8)
                              .set('from', from ? from : 0)
    };

    return this.http.get<ResponseMainSpirits>(`${environment.API_URL}/public/spirits`, httpOptions);
  }

}
