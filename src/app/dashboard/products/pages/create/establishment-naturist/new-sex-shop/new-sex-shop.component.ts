import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CigaretteService } from '../../../../services/establishment-spirit/cigarette.service';

@Component({
  selector: 'app-new-sex-shop',
  templateUrl: './new-sex-shop.component.html',
  styleUrls: ['./new-sex-shop.component.scss']
})
export class NewSexShopComponent implements OnInit {

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
    private cigaretteService: CigaretteService
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
    this.categoryService.getAllCategories( "cigarette" ).subscribe(
      categories => this.categories = categories.categories,
      () => this.sweetAlert.presentError("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades( "cigarette" ).subscribe(
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

    this.cigaretteService.createProduct( this.form.value ).subscribe(
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
