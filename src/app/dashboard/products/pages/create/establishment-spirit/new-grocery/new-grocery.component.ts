import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { GroceryService } from 'src/app/dashboard/products/services/establishment-spirit/grocery.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-new-grocery',
  templateUrl: './new-grocery.component.html',
  styleUrls: ['./new-grocery.component.scss']
})
export class NewGroceryComponent implements OnInit 
{

  public form!: FormGroup;

  // ****************DATA**************** //
  public categories: Category[] = [];
  public units: Unit[] = [];
  public imgURL: any;
  // ************************************ //

  constructor(
    private fb: FormBuilder,
    private sweetAlert: SweetAlertService,
    private formsValidationService: FormsValidationService,
    private router: Router,
    // public dialog: MatDialog,
    private categoryService: CategoryService,
    private unitService: UnidadMedidaService,
    private groceryService: GroceryService
  ) 
  { 
    this.createFormBuilder();
  }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.loadCategories();
    this.loadUnits();
  }

  loadCategories()
  {
    this.categoryService.getAllCategories( "grocery" ).subscribe(
      categories => this.categories = categories.categories,
      () => this.sweetAlert.presentError("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades( "grocery" ).subscribe(
      units => this.units = units.units,
      () => this.sweetAlert.presentError("Error obteniendo unidades de medida")
    );
  }

  createFormBuilder(): void
  {
    this.form = this.fb.group({
      img:                [],
      category:           [ '', [Validators.required] ],
      name:               [ '', [Validators.required, Validators.minLength(3)] ],
      unit:               [ '', [Validators.required] ],
      barcode:            [ '' ],
      stock:              [ 1, [Validators.required, Validators.min(1)] ],
      purchase_price:     [ 0, [Validators.min(0)] ],
      sale_price:         [ 0, [Validators.min(0)] ],
      second_sale_price:  [ 0, [Validators.min(0)] ],
      current_existence:  [ 0, [Validators.min(0)] ]
    });
  }

  validField( field: string )
  {
    return this.formsValidationService.validField( this.form, field );
  }

  onSelectImg(event: any)
  {
    const element = event.target as HTMLInputElement;
    if(element.files && element.files.length)
    {      
      const files = element.files;       
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

  onSubmit()
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.groceryService.createProduct( this.form.value ).subscribe(
      (res) => {
        this.sweetAlert.presentSuccess('Producto creado correctamente!');
        this.router.navigate(['/dashboard/products']);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError(error.error.error)
      }
    );
  }
}
