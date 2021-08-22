import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Output,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Output() accion = new EventEmitter<boolean>(); //
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      actions?: {
        primary?: string;
        secondary?: string;
      };
    }
  ) {}

  aceptar() {
    this.accion.emit(true);
  }

  cancelar() {
    this.accion.emit(false);
  }
}

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
