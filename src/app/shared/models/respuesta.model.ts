import { MatDialogRef } from "@angular/material/dialog";
import { CrudDialogComponent } from "../crud-dialog/crud-dialog.component";

export interface Respuesta {
  data: any;
  estado: boolean;
  dialogRef: MatDialogRef<CrudDialogComponent> | null;
}
