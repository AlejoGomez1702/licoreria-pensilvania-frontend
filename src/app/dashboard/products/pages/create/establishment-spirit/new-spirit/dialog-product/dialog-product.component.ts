import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectableProduct } from 'src/app/dashboard/products/interfaces/SelectableProduct';
import { SpiritService } from 'src/app/dashboard/products/services/establishment-spirit/spirit.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit 
{
  public idSelectedProduct: string = '';
  public selectedProduct = new FormControl();
  public filteredProducts: Observable<SelectableProduct[]>;
  public products: SelectableProduct[] = [];

  constructor(
    private spiritService: SpiritService,
    private filterService: FilterService,
    private sweetAlert: SweetAlertService,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, // ID del producto seleccionado
  ) 
  { 
    this.filteredProducts = this.selectedProduct.valueChanges.pipe(
      startWith(''),
      map(product => (product ? this._filterProducts(product) : this.products.slice())),
    );
  }

  ngOnInit(): void 
  {
    this.loadProducts();
  }

  private _filterProducts(value: string): SelectableProduct[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(product => {
      const fullProductName = product.category.name + ' ' + product.name + ' ' + product.unit.unit;
      // console.log(fullProductName);
      return fullProductName.toLowerCase().includes(filterValue);
    });
  }

  searchProductsMatch()
  {
    const term = this.selectedProduct.value as string | '';
    if( term )
    {
      this.filterService.searchSpirits( term, true ).subscribe(
        spirits => {
          this.products = spirits.map(product => {
            const { id = '', category, unit, name, img } = product;
            const shortProductData = { id , category, unit, name, img };
    
            return shortProductData;
          });
        },
        (error) => {
          console.log("Error buscando los productos");
          console.log(error);
        }
      );
    }
  }

  getFullProductName( product: SelectableProduct )
  {
    return `${product.category.name} ${product.name} | ${product.unit.unit}`;
  }

  selectProduct( id: string )
  {
    this.idSelectedProduct = id;
    this.data = id;
  }

  clearData()
  {
    this.idSelectedProduct = '';
    this.selectedProduct.setValue('');
  }

  loadProducts()
  {
    this.spiritService.getSercheablesProducts()
    .subscribe(res => {
      this.products = res.spirits.map(product => {
        const { id = '', category, unit, name, img } = product;
        const shortProductData = { id , category, unit, name, img };

        return shortProductData;
      });

      if(this.products.length === 0)
      {
        this.selectedProduct.disable();
      }
    },
    error => {
      this.sweetAlert.presentError(error.error.error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
