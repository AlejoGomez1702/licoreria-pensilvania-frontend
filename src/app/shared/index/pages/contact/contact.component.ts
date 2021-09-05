import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ContactData } from '../../interfaces/ContactData';
import { ContactService } from '../../services/contact.service';
declare const main: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit 
{
  public contactData: ContactData = {
    name: '',
    _replyto: '',
    subject: '',
    message: ''
  }

  constructor(
    private contactService: ContactService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void 
  {
    main();
  }

  sendContactData(): void
  {
    this.contactService.sendContactEmail(this.contactData).subscribe(
      res => this.sweetAlert.presentSuccess('Correo Enviado!'),
      error => this.sweetAlert.presentError('Error Enviando Correo!')
    );
  }

}
