import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Provider } from '../../interfaces/Provider';

@Component({
  selector: 'app-new-provider-dialog',
  templateUrl: './new-provider-dialog.component.html',
  styleUrls: ['./new-provider-dialog.component.scss']
})
export class NewProviderDialogComponent implements OnInit 
{

  constructor(
    public dialogRef: MatDialogRef<NewProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Provider,
    private sweetAlert: SweetAlertService
  ) 
  { }

  ngOnInit(): void {
  }

  saveProvider(): void
  {
    let provider: Provider = {dni: '', name: '', cellphone: ''};
    const { id, dni, name, cellphone, email } = this.data;
    // Comprobar los campos requeridos
    // Comprobar que el teléfono sea numerico
    if( dni && name && cellphone && parseInt(cellphone))
    {
      provider.id = id;
      provider.dni = dni;
      provider.name = name;
      provider.cellphone = `${cellphone}`;

      if( email )
      {
        provider.email = email;
      }

      this.dialogRef.close( provider );
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
