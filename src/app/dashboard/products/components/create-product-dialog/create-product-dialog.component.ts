import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


 // Seleccionar las caracteristicas**************
 import {COMMA, ENTER} from '@angular/cdk/keycodes';
 import {ElementRef, ViewChild} from '@angular/core';
 import {FormControl} from '@angular/forms';
 import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
 import {MatChipInputEvent} from '@angular/material/chips';
 import {Observable} from 'rxjs';
 import {map, startWith} from 'rxjs/operators';
 // ***********************************************************************

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent implements OnInit 
{
  // Seleccionar las caracteristicas**************
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  // ***********************************************************************





  form: FormGroup ;
  formInsertMode: boolean;
  formEditMode: boolean;
  formViewMode: boolean;
  formDeleteMode: boolean;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              private cdr: ChangeDetectorRef,
              private formBuilder: FormBuilder,
  ) 
  { 
    // Seleccionar las caracteristicas**************
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    // ***********************************************************************


    this.formInsertMode = false;
    this.formViewMode = false;
    this.formEditMode = false;  
    this.formDeleteMode= false;          
    this.form = this.formBuilder.group({
        id: ['',[Validators.required]],//requerido
        img: ['', Validators.required],
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

    buildForm() 
    {
      this.form = this.formBuilder.group({
                                            id:[''],
                                            category: ['',[Validators.required] ],
                                            name: ['',[Validators.required] ], //requerido, 0-10000
                                            
                                          });
      if(this.formDeleteMode)
      {
        this.form.disable();
      }
    }

    ngAfterViewChecked(): void {
      this.cdr.detectChanges();
    }
    limpiarFormulario(){
      this.form.reset();
    }


  // Seleccionar las caracteristicas**************
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  // ***********************************************************************


}
