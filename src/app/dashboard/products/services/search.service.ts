import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseSearch } from '../interfaces/ResponseSearch';

@Injectable({
  providedIn: 'root'
})
export class SearchService 
{
  constructor(
    private http: HttpClient
  ) 
  { }

  searchProduct( term: string, supercategory: string ): Observable<ResponseSearch>
  {
    const httpOptions = {
      params: new HttpParams().set('supercategory', supercategory)
    };
    //   /api/searchs/products/--------
    return this.http.get<ResponseSearch>(`${environment.API_URL}/searchs/products/${term}`, httpOptions);
  }
}
