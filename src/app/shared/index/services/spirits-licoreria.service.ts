import { HttpClient } from '@angular/common/http';
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

}
