import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.scss']
})
export class FormProviderComponent implements OnInit {

  form: FormGroup;
  formInsertMode: boolean;
  formEditMode: boolean;
  formViewMode: boolean;
  formDeleteMode: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.formInsertMode = false;
    this.formViewMode = false;
    this.formEditMode = false;  
    this.formDeleteMode= false;
    this.form = this.formBuilder.group({
      id: [''],//requerido
      email: [''],
      name: ['',[Validators.required]],
      identification: [0,[Validators.required]],
      cellphone: [0,[Validators.required]],
      created_at: [],
      updated_at: [],
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
      id: [''],//requerido
      email: [''],
      name: ['',[Validators.required]],
      identification: [0,[Validators.required]],
      cellphone: [0,[Validators.required]],
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
