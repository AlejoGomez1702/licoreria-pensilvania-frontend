import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { SpiritService } from 'src/app/dashboard/products/services/establishment-spirit/spirit.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { DialogProductComponent } from './dialog-product/dialog-product.component';

@Component({
  selector: 'app-new-spirit',
  templateUrl: './new-spirit.component.html',
  styleUrls: ['./new-spirit.component.scss']
})
export class NewSpiritComponent implements OnInit 
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
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private unitService: UnidadMedidaService,
    private spiritService: SpiritService
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
    this.categoryService.getAllCategories( "spirit" ).subscribe(
      categories => this.categories = categories.categories,
      () => this.sweetAlert.presentError("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades( "spirit" ).subscribe(
      units => this.units = units.units,
      () => this.sweetAlert.presentError("Error obteniendo unidades de medida")
    );
  }

  createFormBuilder(): void
  {
    this.form = this.fb.group({
      img:                       [],
      category:                  [ '', [Validators.required] ],
      name:                      [ '', [Validators.required, Validators.minLength(3)] ],
      unit:                      [ '', [Validators.required] ],
      barcode:                   [ '' ],
      stock:                     [ 1, [Validators.required, Validators.min(1)] ],
      vol_alcohol:               [ 0, [Validators.required, Validators.min(0), Validators.max(100)] ],
      purchase_price:            [ 0, [Validators.min(0)] ],
      sale_price:                [ 0, [Validators.min(0)] ],
      second_sale_price:         [ 0, [Validators.min(0)] ],
      current_existence:         [ 0, [Validators.min(0)] ]
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

    this.spiritService.createProduct( this.form.value ).subscribe(
      (res) => {
        this.sweetAlert.presentSuccess('Producto creado correctamente!');
        console.log(res);
        this.router.navigate(['/dashboard/products']);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError(error.error.error)
      }
    );
  }

  // ************* Busqueda de existentes ********************//
  openProductDialog()
  {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      minWidth: '450px',
      maxWidth: '650px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(spiritID => {
      if(spiritID)
      {
        this.showProductData( spiritID );
      }
    });
  }

  deleteFormData()
  {
    this.form.reset();
    this.imgURL = '';
  }

  showProductData( id: string )
  {
    this.spiritService.getSpiritById( id, true ).subscribe(
      spirit => {
        // console.log(spirit);
        const { category, unit, ...data } = spirit;
        this.form.reset({
          category: category._id,
          unit: unit._id,
          ...data
        });
        this.imgURL = data.img;
      },
      (error) => this.sweetAlert.presentError('Error cargando el producto!')
    );
  }

  // ---------------- Busqueda de existentes -------------- //

}
