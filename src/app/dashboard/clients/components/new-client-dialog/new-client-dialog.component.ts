import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Client } from '../../interfaces/Client';

@Component({
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.scss']
})
export class NewClientDialogComponent implements OnInit 
{

  constructor(
    public dialogRef: MatDialogRef<NewClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private sweetAlert: SweetAlertService
  ) 
  { }

  ngOnInit(): void {
  }

  saveClient(): void
  {
    let client: Client = {name: '', cellphone: ''};
    const { id, dni, name, cellphone, address } = this.data;
    // Comprobar los campos requeridos
    // Comprobar que el teléfono sea numerico
    if( name && cellphone && parseInt(cellphone))
    {
      client.id = id;
      client.name = name;
      client.cellphone = `${cellphone}`;

      // si vienen los campos opcionales agregarlos
      if( dni )
      {
        client.dni = `${dni}`
      }

      if( address )
      {
        client.address = address;
      }

      this.dialogRef.close( client );
    }
    else
    {
      this.sweetAlert.presentError("Compruebe los datos ingresados!");
    }
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }

}
