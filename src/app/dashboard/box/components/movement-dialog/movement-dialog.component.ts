import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Movement } from '../../interfaces/Movement';

@Component({
  selector: 'app-movement-dialog',
  templateUrl: './movement-dialog.component.html',
  styleUrls: ['./movement-dialog.component.scss']
})
export class MovementDialogComponent implements OnInit 
{
  public movement: Movement = {
    amount: 0,
    description: '',
    type: ''
  };

  constructor(
    public dialogRef: MatDialogRef<MovementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public type: string,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void 
  {
    this.movement.type = this.type;
  }

  saveMovement(): void
  {
    const { amount, description } = this.movement;
    // Comprobar los campos requeridos
    // Comprobar que el teléfono sea numerico
    if( amount && description)
    {
      this.dialogRef.close( this.movement );
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
