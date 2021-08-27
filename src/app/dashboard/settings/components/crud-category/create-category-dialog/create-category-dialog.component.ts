import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// export interface DialogData {
//   id: string;
//   name: string;
// }
@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit 
{
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
        id: ['',[Validators.required]],//requerido
        alcohol: ['',Validators.compose(
          [Validators.required,
          Validators.max(100),
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
        name: ['',[Validators.required] ], //requerido, 0-10000
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