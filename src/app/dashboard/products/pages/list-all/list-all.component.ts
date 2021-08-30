import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CreateProductDialogComponent } from '../../components/create-product-dialog/create-product-dialog.component';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements OnInit 
{

  displayedColumns = ['name', 'unit', 'sale_price', 'stock', 'current_existence', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;

  constructor(
    private productService: ProductService,
    private sweetAlert: SweetAlertService,
    private crudService: CrudService,
    private changeRef: ChangeDetectorRef,
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }
  
  loadData()
  {
    this.productService.getAllProducts()
    .subscribe(res => {
      this.dataSource.data = res.products;
    },
    error => {
      this.sweetAlert.presentError(error.error.error);
    });
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFullProductName( product: Product ): string
  {
    let name = `${ product.category.name } ${ product.name }`;
    for (const feature of product.features) 
    {
      name += ' ' + feature;      
    }

    return name;
  }

  createProduct()
  {
    this.subscription = this.crudService.show({
      title: 'Crear Producto',
      component: CreateProductDialogComponent,
      dataComponent: {
        insertMode: true,
      },
      actions: {
        primary: 'Guardar'
      },
      maxWidth: '70%',
    }).subscribe((resultado) => {
      if (resultado.estado) 
      {
        const product = resultado.data as Product;
        // const { img, ...product } = productData;
        // const file = productData.file?._files[0];
        // product.file = img;
        // product.img = file || '';
        // console.log(product);
        this.productService.createProduct( product ).subscribe(
          product => {
            if(product)
            {              
              // const oldData= this.dataSource.data;
              this.dataSource = new MatTableDataSource();
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.loadData();
              this.sweetAlert.presentSuccess(`Producto Creado Correctamente!`);
              this.crudService.close();
            }else{
              this.sweetAlert.presentError( "No se pudo crear el producto" );
            }            
          },
          error => {
            this.sweetAlert.presentError( error.error.error );
          }
        );
      }      
    });
  }

  editProduct(row: Product){
    this.subscription=this.crudService.show({
      title: 'Editar Producto',
      component: CreateProductDialogComponent,
      dataComponent: {
        viewMode: false,
        insertMode: false,
        editMode:true,
        row
      },
      maxWidth: '70%',
      actions: {
        primary: 'Guardar'
      }
    }).subscribe((resultado) => {
      if (resultado.estado) 
      {
        const product = resultado.data as Product;
        this.productService.updateProduct( product ).subscribe(
          product => {
            this.loadData();
            this.sweetAlert.presentSuccess(`Producto Editado Correctamente!`);
            this.crudService.close();
          },
          error => this.sweetAlert.presentError( error.error.error )
        );
      }
    });
  }

}
