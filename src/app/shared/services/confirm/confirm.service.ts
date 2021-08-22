import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';
@Injectable({
  providedIn: 'root',
})
export class Confirm {
  constructor(private dialog: MatDialog) {}
  public show(data: {
    title: string;
    content: string;
    actions?: {
      primary?: string;
      secondary?: string;
    };
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        disableClose: true,
        panelClass: 'modalax12789',
        maxHeight: '90vh',
        maxWidth: '600px',
        minWidth: '300px',
        width: '95%',
        data,
      });
      dialogRef.componentInstance.accion.subscribe(
        (accion: boolean) => {
          resolve(accion);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
