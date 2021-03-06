import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RangeDateTime } from '../../sales/interfaces/RangeDateTime';
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

  searchProduct( term: string, supercategory?: string, limit?: number, from?: number, category?: string ): Observable<ResponseSearch>
  {
    const httpOptions = {
      params: new HttpParams().set('supercategory', supercategory ? supercategory : '')
                              .set('category', category ? category : '')
                              .set('limit', limit ? limit : 8)
                              .set('from', from ? from : 0)
    };
    //   /api/searchs/products/--------
    return this.http.get<ResponseSearch>(`${environment.API_URL}/searchs/products/${term}`, httpOptions);
  }

}
