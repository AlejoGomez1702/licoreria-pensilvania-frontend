import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { ProductService } from 'src/app/dashboard/products/services/product.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../../../interfaces/Product';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit 
{

  public product!: Product;
  public form!: FormGroup;

  // ****************DATA**************** //
  public categories: Category[] = [];
  public units: Unit[] = [];
  public imgURL: any;
  // ************************************ //

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private unitService: UnidadMedidaService,
    private activatedRoute: ActivatedRoute,
    private formsValidationService: FormsValidationService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { }

  ngOnInit(): void 
  {
    this.buildForm( true );
    this.loadData();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
      this.getProductSelected( id )
    }
    else
    {
      this.sweetAlert.presentError('Error iniciando el cigarrillo seleccionado (NO ID)');
      this.router.navigate(['/dashboard/products']);
    }
  }

  loadData()
  {
    this.loadCategories();
    this.loadUnits();
  }

  loadCategories()
  {
    this.categoryService.getAllCategories('drink').subscribe(
      categories => this.categories = categories.categories,
      () => this.sweetAlert.presentError("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades('drink').subscribe(
      units => this.units = units.units,
      () => this.sweetAlert.presentError("Error obteniendo unidades de medida")
    );
  }

  getProductSelected( id: string )
  {
    this.productService.getProductById( id, false ).subscribe(
      drink => {
        this.product = drink;
        this.buildForm( false );
      },
      error => {
        console.log( error );
      }
    );
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

  buildForm(firstBuild: boolean)
  {
    if(firstBuild)
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
    else
    {
      const { category, unit, ...data } = this.product;
      this.form.reset({
        category: category._id,
        unit: unit._id,
        ...data
      });

      this.imgURL = data.img;
    }
  }

  validField( field: string )
  {
    return this.formsValidationService.validField( this.form, field );
  }

  onSubmit()
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.productService.updateProduct( this.product.id!, this.form.value, 'drink' ).subscribe(
      () => {
        this.sweetAlert.presentSuccess('Producto actualizado correctamente!');
        this.router.navigate(['/dashboard/products']);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError(error.error.error)
      }
    );
  }
}
