import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactData } from '../interfaces/ContactData';

@Injectable({
  providedIn: 'root'
})
export class ContactService 
{
  apiUrl = 'https://formspree.io/f/xyylldqo';

  constructor(
    private http: HttpClient
  ) { }

  sendContactEmail( contactData: ContactData )
  {
    return this.http.post(this.apiUrl, contactData);
  }
}
