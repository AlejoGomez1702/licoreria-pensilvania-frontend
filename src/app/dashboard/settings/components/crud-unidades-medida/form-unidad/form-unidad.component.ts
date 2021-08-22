import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-unidad',
  templateUrl: './form-unidad.component.html',
  styleUrls: ['./form-unidad.component.scss']
})
export class FormUnidadComponent implements OnInit, AfterViewChecked {
  form: FormGroup ;
  formInsertMode: boolean;
  formEditMode: boolean;
  formViewMode: boolean;
  formDeleteMode: boolean;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              private cdr: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              ) { 
    this.formInsertMode = false;
    this.formViewMode = false;
    this.formEditMode = false;  
    this.formDeleteMode= false;          
    this.form = this.formBuilder.group({
      unit: ['',[Validators.required]],//requerido
      ml: ['',Validators.compose(
                  [Validators.required,
                  Validators.max(10000),
                  Validators.min(0)]) ], //requerido, 0-10000
    });
              }

  ngOnInit(): void {
    this.formInsertMode = this.data?.insertMode;
    this.formViewMode = this.data?.viewMode;
    this.formEditMode = this.data?.editMode;
    this.formDeleteMode = this.data?.deleteMode;
    this.buildForm();
    this.form.patchValue(this.data?.row);
  }
  buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      unit: ['',[Validators.required]],//requerido
      ml: ['',Validators.compose(
                  [Validators.required,
                  Validators.max(10000),
                  Validators.min(0)]) ], //requerido, 0-10000
    });
    if(this.formDeleteMode){
      this.form.disable();
    }
  }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
  limpiarFormulario(){
    this.form.reset();
  } 

}
