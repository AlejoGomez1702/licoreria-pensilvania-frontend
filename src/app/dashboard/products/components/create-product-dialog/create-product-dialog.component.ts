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

import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { ProductService } from '../../services/product.service';
import { Alcohol } from 'src/app/dashboard/settings/interfaces/alcohol.interface';
import { AlcoholService } from 'src/app/dashboard/settings/services/alcohol.service';


@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent implements OnInit 
{
  form: FormGroup = new FormGroup({}); formInsertMode: boolean; formEditMode: boolean; formViewMode: boolean; formDeleteMode: boolean;
  // Seleccionar las caracteristicas**************
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFeatures!: Observable<string[]>;
  selectedFeatures: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  // ***********************************************************************

  // Imagen del producto *********************************
  // public imagePath: string = '';
  public imgURL: any;
  // public message: string = '';
  // public img: any = {};
  // imageSrc: string = '';
  // *************************************************************

  // DATA *********************************
  public categories: Category[] = [];
  public units: Unit[] = [];
  public allFeatures: string[] = [];
  public alcohols: Alcohol[] = [];
  // *************************************************************

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private unitService: UnidadMedidaService,
    private productService: ProductService,
    private alcoholService: AlcoholService,
    private cd: ChangeDetectorRef
  ) 
  { 
    this.formInsertMode = false;
    this.formViewMode = false;
    this.formEditMode = false;  
    this.formDeleteMode= false;
  }

  ngOnInit(): void 
  {
    this.loadData();
    this.formInsertMode = this.data?.insertMode;
    this.formViewMode = this.data?.viewMode;
    this.formEditMode = this.data?.editMode;
    this.formDeleteMode = this.data?.deleteMode;
    this.buildForm();
    this.form.patchValue(this.data?.row);

    // Seleccionar las caracteristicas**************
    const featuresField = this.form.get('features');
    if( featuresField )
    {
      this.filteredFeatures = featuresField.valueChanges.pipe(
        startWith(null),
        map((feature: string | null) => feature ? this._filter(feature) : this.allFeatures.slice()));
    }
    // ***********************************************************************
    
  }

  buildForm() 
  {
    this.form = this.formBuilder.group({
                                          // file: [null,[Validators.required] ],
                                          img: [null, [Validators.required]],
                                          category: ['',[Validators.required] ],
                                          unit: ['',[Validators.required] ],
                                          name: ['',[Validators.required] ], 
                                          features: [[]],
                                          barcode: ['',[] ],
                                          stock: [1,[Validators.min(1)] ],
                                          alcohol: ['' ,[Validators.required] ],
                                          purchase_price: [null],
                                          sale_price: [null],
                                          current_existence: [0, [Validators.required]]                                          
                                        });
    if(this.formDeleteMode)
    {
      this.form.disable();
    }
  }

  loadData()
  {
    this.loadCategories();
    this.loadUnits();
    this.loadFeatures();
    this.loadAlcohols();
  }

  loadCategories()
  {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories.categories;
      },
      error => console.log("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades().subscribe(
      units => {
        this.units = units.units;
      },
      error => console.log("Error obteniendo unidades de medida")
    );
  }

  loadFeatures()
  {
    this.productService.getAllFeatures().subscribe(
      features => {
        this.allFeatures = features.features;
      },
      error => console.log("Error obteniendo Caracteristicas de los productos")
    );
  }

  loadAlcohols()
  {
    this.alcoholService.getAllAlcohol().subscribe(
      alcohols => {
        this.alcohols = alcohols.alcohols;
      },
      error => console.log("Error obteniendo alcoholes de los productos")
    );
  }

  ngAfterViewChecked(): void 
  {
    this.cdr.detectChanges();
  }

  limpiarFormulario()
  {
    this.form.reset();
  }

  /**
   * Se activa cuando se agrega una nueva caracteeristica que no esta en lista.
   * @param event 
   */
  add(event: MatChipInputEvent): void 
  {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedFeatures.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.selectedFeatures = [...new Set( this.selectedFeatures )];
    this.form.get('features')?.setValue(this.selectedFeatures);    
  }

  remove(feature: string): void {
    const index = this.selectedFeatures.indexOf(feature);

    if (index >= 0) {
      this.selectedFeatures.splice(index, 1);
    }

    this.selectedFeatures = [...new Set( this.selectedFeatures )];
    this.form.get('features')?.setValue(this.selectedFeatures);    
  }

  /**
   * Se activa cuando se selecciona una nueva caracteeristica en lista.
   * @param event 
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedFeatures.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.selectedFeatures = [...new Set( this.selectedFeatures )];
    this.form.get('features')?.setValue(this.selectedFeatures);    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFeatures.filter(feature => feature.toLowerCase().includes(filterValue));
  }

  // ***********************************************************************

  onSelect(event: any) 
  {
    const element = event.target as HTMLInputElement;
    if(element.files && element.files.length)
    {      
      const files = element.files;
      if(files)
      {
        const file = files[0];
        this.form.patchValue({img: file});
        this.form.get('img')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
          this.imgURL = reader.result?.toString() || '';
        }    

        reader.readAsDataURL(file);
      }
    }
  }
}
