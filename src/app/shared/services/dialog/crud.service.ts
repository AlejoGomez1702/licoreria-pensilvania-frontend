import { Injectable } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { CrudDialogComponent } from "../../crud-dialog/crud-dialog.component";
import { Marco } from "../../models/marco.model";
import { Respuesta } from "../../models/respuesta.model";
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  referencias: Map<
    MatDialogRef<CrudDialogComponent>,
    MatDialogRef<CrudDialogComponent>
  > = new Map();
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CrudDialogComponent>
  ) {}

  public show(data: Marco): Observable<Respuesta> {
    
    return new Observable((observer: any) => {
      const ref = this.dialog.open(CrudDialogComponent, {
        disableClose: true,
        panelClass: 'modalax12789',
        maxHeight: '90vh',
        maxWidth: data.maxWidth ? data.maxWidth : '600px',
        minWidth: '300px',
        width: '95%',
        data,
      });
      this.referencias.set(ref, ref);
      this.dialogRef = ref;
      this.dialogRef.componentInstance.accion.subscribe(
        (accion: Respuesta) => {
          accion.dialogRef = ref;
          observer.next(accion);
        },
        (err: any) => {
          observer.error(err);
        }
      );
    });
  }

  public close(dialogRef?: MatDialogRef<CrudDialogComponent>) {
    if (dialogRef) {
      this.referencias.get(dialogRef)?.close();
      this.referencias.delete(dialogRef);
    } else {
      this.dialogRef.close();
    }
  }
}
