import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGetAllSuperCategories } from '../interfaces/ResponseGetAllSuperCategories';

@Injectable({
  providedIn: 'root'
})
export class SuperCategoryService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todas las supercategorias.
   * @returns Todos las supercategorias.
    */
  getAllSuperCategories(): Observable<ResponseGetAllSuperCategories>
  {
    const establishment = localStorage.getItem('establishment') || '';

    const httpOptions = {
      params: new HttpParams().set('establishment', establishment)
    };

    return this.http.get<ResponseGetAllSuperCategories>(`${environment.API_URL}/supercategories`, httpOptions);
  }

  matchIdWithName( supercategoryId: string )
  {
    let superCategoryMatch = '';

    switch ( supercategoryId ) 
    {
        case '61414fa3752e94b6aa171231':
            superCategoryMatch = 'spirit';
        break;

        case '6141686c752e94b6aa17123f':
            superCategoryMatch = 'cigarette';
        break;

        case '61d7a5ea2c38bdb5f64dcf7c':
            superCategoryMatch = 'drink';
        break;

        case '61d7b1a02c38bdb5f64dcfb0':
            superCategoryMatch = 'grocery';
        break;
    
        case '628ee88875cf2ef75b1209fc':
            superCategoryMatch = 'naturist';
        break;

        case '628ee89c75cf2ef75b1209fd':
            superCategoryMatch = 'sexshop';
        break;
    
        default: break;          
    }

    return superCategoryMatch;
  }

}
