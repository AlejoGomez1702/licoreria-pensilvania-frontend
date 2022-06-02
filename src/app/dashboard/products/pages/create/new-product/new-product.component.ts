import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { ProductService } from 'src/app/dashboard/products/services/product.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit 
{
  public title: string = 'INVENTARIO DE PRODUCTOS ';
  public productType: string = '';

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
    private activatedRoute: ActivatedRoute,
    // public dialog: MatDialog,
    private categoryService: CategoryService,
    private unitService: UnidadMedidaService,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) 
  { 
    this.verifyProductType();
    this.createFormBuilder();
  }

  ngOnInit(): void 
  {    
    this.loadData();
  }

  verifyProductType()
  {
    const productType = this.activatedRoute.snapshot.paramMap.get('type');
    if(productType)
    {
      this.productType = productType;
      let title = 'CREAR NUEVO PRODUCTO ';
      title += this.inventoryService.verifyCreateProductTitle( productType );
      this.title = title;
    }
  }

  // verifyFields()
  // {
  //   if(this.productType === '')
  //   {

  //   }
  // }

  loadData()
  {
    this.loadCategories();
    this.loadUnits();
  }

  loadCategories()
  {
    this.categoryService.getAllCategories( this.productType ).subscribe(
      categories => this.categories = categories.categories,
      () => this.sweetAlert.presentError("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades( this.productType ).subscribe(
      units => this.units = units.units,
      () => this.sweetAlert.presentError("Error obteniendo unidades de medida")
    );
  }

  createFormBuilder(): void
  {
    const formData = this.inventoryService.verifyCreateProductFormBuilder( this.productType );
    console.log("pordisds: ", this.productType);
    this.form = this.fb.group( formData );
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

    this.productService.createProduct( this.form.value, this.productType ).subscribe(
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
