import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsValidationService } from 'src/app/core/services/forms-validation.service';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../../interfaces/Product';
import { InventoryService } from '../../../services/inventory.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit 
{
  public productType: string = '';
  public productId: string = '';

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
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if(productType  && productId)
    {
      this.getProductSelected( productId );
      this.productType = productType;
      this.productId = productId;
    }
  }

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

  getProductSelected( id: string )
  {
    this.productService.getProductById( id, false ).subscribe(
      product => {
        const { category, unit, ...data } = product;
        this.form.reset({
          category: category._id,
          unit: unit._id,
          ...data
        });
  
        this.imgURL = data.img;

        // this.product = spirit;
        // this.buildForm( false );
      },
      error => {
        console.log( error );
      }
    );
  }

  createFormBuilder(): void
  {
    const formData = this.inventoryService.verifyProductFormBuilder( this.productType );
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

    this.productService.updateProduct( this.productId, this.form.value, this.productType ).subscribe(
      (res) => {
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
