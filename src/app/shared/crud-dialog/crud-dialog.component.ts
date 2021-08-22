import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdDirective } from '../directives/ad-component.directive';
import { Button } from '../models/button.model';
import { Marco } from '../models/marco.model';
import { Respuesta } from '../models/respuesta.model';
import { Confirm } from '../confirm/confirm.component';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss'],
})
export class CrudDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() accion = new EventEmitter<Respuesta>();
  @ViewChild(AdDirective, { static: true })
  adHost!: AdDirective;

  subscription: Subscription = new Subscription();
  public form!: FormGroup;
  componentRef!: ComponentRef<any>;
  otherButtons: Button[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Marco,
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<CrudDialogComponent>,
    public confirm: Confirm
  ) { }
  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.data.component
    );
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.data = this.data.dataComponent;
    this.otherButtons = this.data.actions?.otherButtons ? this.data.actions.otherButtons : [];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form = this.componentRef.instance?.form;
    }, 0);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  aceptar() {
    if (!this.form?.invalid) {
      this.accion.emit({
        data: this.form.getRawValue(),
        estado: true,
        dialogRef: null,
      });
    } else {
      this.form?.markAllAsTouched();
    }
  }

  async cerrar() {
    this.dialogRef.close();
    this.accion.emit({ data: null, estado: false, dialogRef: null });
  }

  cancelar() {
    if (this.data.dataComponent?.editMode) {
      this.cerrar();
    } else {
      if (this.componentRef.instance.limpiarFormulario) {
        this.componentRef.instance.limpiarFormulario();
      } else {
        console.error(
          'Method limpiarFormulario() not exits at:̣̣ ' +
          this.componentRef.componentType.name
        );
      }
    }
  }
}
