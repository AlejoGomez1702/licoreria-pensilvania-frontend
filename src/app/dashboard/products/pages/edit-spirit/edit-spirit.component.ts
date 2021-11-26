import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Alcohol } from 'src/app/dashboard/settings/interfaces/alcohol.interface';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { AlcoholService } from 'src/app/dashboard/settings/services/alcohol.service';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Spirit } from '../../interfaces/Spirit';
import { SpiritService } from '../../services/spirit.service';

@Component({
  selector: 'app-edit-spirit',
  templateUrl: './edit-spirit.component.html',
  styleUrls: ['./edit-spirit.component.scss']
})
export class EditSpiritComponent implements OnInit, AfterViewChecked
{
  public spirit!: Spirit | null;
  form: FormGroup = new FormGroup({});
  // Seleccionar las caracteristicas**************
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFeatures!: Observable<string[]>;
  selectedFeatures: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  // ***********************************************************************

  public supercategory: string = '';

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
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private unitService: UnidadMedidaService,
    // private productService: ProductService,
    private spiritService: SpiritService,
    private alcoholService: AlcoholService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSpiritSelected( id );
    this.loadData();
    // this.formInsertMode = this.data?.insertMode;
    // this.formViewMode = this.data?.viewMode;
    // this.formEditMode = this.data?.editMode;
    // this.formDeleteMode = this.data?.deleteMode;
    this.buildForm();
    // this.form.patchValue(this.data?.row);

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

  async getSpiritSelected( id: string | null )
  {
    if( id )
    {
      // const spirit = await this.spiritService.getSpiritById( id );
      this.spiritService.getSpiritById( id ).subscribe(
        spirit => {
          this.spirit = spirit;
          this.buildForm();
        },
        error => {
          console.log( error );
        }
      );
    }
    else
    {
      this.sweetAlert.presentError('Error iniciando el licor seleccionado');
      this.router.navigate(['/dashboard/products']);
    }
  }

  buildForm() 
  {
    // this.selectedFeatures = this.spirit?.features ? this.spirit.features : [];
    // this.imgURL = this.spirit?.img;

    // this.form = this.formBuilder.group({
    //                                       // file: [null,[Validators.required] ],
    //                                       id: [this.spirit?.id],                                          
    //                                       img: [this.spirit?.img, [Validators.required]],
    //                                       category: [this.spirit?.category,[Validators.required] ],
    //                                       unit: [this.spirit?.unit,[Validators.required] ],
    //                                       name: [this.spirit?.name,[Validators.required] ], 
    //                                       features: [this.spirit?.features],
    //                                       barcode: [this.spirit?.barcode,[] ],
    //                                       stock: [this.spirit?.stock,[Validators.min(1)] ],
    //                                       alcohol: [this.spirit?.alcohol ,[Validators.required] ],
    //                                       purchase_price: [this.spirit?.purchase_price],
    //                                       sale_price: [this.spirit?.sale_price],
    //                                       current_existence: [this.spirit?.current_existence, [Validators.required]]                                          
    //                                     });
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
    this.spiritService.getAllFeatures().subscribe(
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
 
  // Editar un producto
  onSubmit()
  {
    console.log("editando producto");
    console.log(this.form.value);
    this.spiritService.updateSpirit( this.form.value ).subscribe(
      spirit => {
        this.sweetAlert.presentSuccess('Producto editado correctamente!');
        this.router.navigate(['/dashboard/products']);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError(error.error.error);
      }
    );
  }

}
