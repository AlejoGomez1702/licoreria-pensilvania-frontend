import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/dashboard/settings/interfaces/category.interfaces';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { CategoryService } from 'src/app/dashboard/settings/services/category.service';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { SpiritService } from '../../../services/spirit.service';
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
    this.categoryService.getAllCategories().subscribe(
      categories => this.categories = categories.categories,
      () => this.sweetAlert.presentError("Error obteniendo categorias")
    );
  }

  loadUnits()
  {
    this.unitService.getAllUnidades().subscribe(
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
      vol_alcohol:        [ 0, [Validators.required, Validators.min(0), Validators.max(100)] ],
      purchase_price:     [ 0, [Validators.min(0)] ],
      sale_price:         [ 0, [Validators.min(0)] ],
      current_existence:  [ 0, [Validators.min(0)] ]
    });
  }

  validField( field: string )
  {
    return this.form.controls[field].errors && this.form.controls[field].touched;
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
      () => {
        this.sweetAlert.presentSuccess('Producto creado correctamente!');
        this.router.navigate(['/dashboard/products']);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError(error.error.error)
      }
    );
  }

  openProductDialog()
  {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      minWidth: '450px',
      maxWidth: '650px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
