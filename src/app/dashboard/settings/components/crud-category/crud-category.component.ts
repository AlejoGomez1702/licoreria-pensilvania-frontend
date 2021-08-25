import { AfterViewInit, Component, ViewChild, OnInit, AfterViewChecked, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CreateCategoryDialogComponent } from './create-category-dialog/create-category-dialog.component';
import { Category } from '../../interfaces/category.interfaces';
import { CategoryService } from '../../services/category.service';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss']
})
export class CrudCategoryComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService,
    private crudService: CrudService,
    private changeRef: ChangeDetectorRef
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
    this.categoryService.getAllCategories()
    .subscribe(res => {
      // console.log(res);
      this.dataSource.data = res.categories;
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

  create(){
    this.subscription = this.crudService.show({
      title: 'Crear Categoría',
      component: CreateCategoryDialogComponent,
      dataComponent: {
        insertMode: true,
      },
      actions: {
        primary: 'Guardar'
      },
      maxWidth: '500px',
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const cat = resultado.data as Category;
        this.categoryService.createCategory(cat.name).subscribe((res: any)=>{
          const oldData= this.dataSource.data;
          this.dataSource = new MatTableDataSource([{id:res?.id, name:res?.name, state:true},...oldData] );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if(res){
            this.sweetAlert.presentSuccess(`Categoría ${cat.name} Creada Correctamente!`);
            this.crudService.close();
          }else{
            this.sweetAlert.presentError( "No se pudo crear la categoria" );
          }
        }  ,(error: any) => {
        this.sweetAlert.presentError( error.error.error );
      });
      }
      
    });
  }

  edit(row: Category){
    this.subscription=this.crudService.show({
      title: 'Editar Categoria',
      component: CreateCategoryDialogComponent,
      dataComponent: {
        viewMode: false,
        insertMode: false,
        editMode:true,
        row
      },
      maxWidth: '500px',
      actions: {
        primary: 'Guardar'
      }
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const cat = resultado.data as Category;
          this.categoryService.updateCategory(cat.id,cat).subscribe(
            () =>{
              this.loadData();
              this.sweetAlert.presentSuccess(`Categoria ${cat.name} Editada Correctamente!`);
              this.crudService.close();
          },
          (error) =>   this.sweetAlert.presentError( error.error.error )
          );

        }
      });
  }

  // delete(row: Category){
  //   this.subscription=this.crudService.show({
  //     title: 'Eliminar categoria',
  //     component: CreateCategoryDialogComponent,
  //     dataComponent: {
  //       viewMode: false,
  //       insertMode: false,
  //       editMode:false,
  //       deleteMode:true,
  //       row
  //     },
  //     maxWidth: '500px',
  //     actions: {
  //       primary: 'Guardar'
  //     }
  //   }).subscribe((resultado) => {
  //     if (resultado.estado) {
  //       const cat = resultado.data as Category;
  //         this.categoryService.deleteCategory(cat.id).subscribe(
  //           () =>{
  //             this.loadData();
  //             this.sweetAlert.presentSuccess(`Categoria ${cat.name} Eliminada Correctamente!`);
  //             this.crudService.close();
  //         },
  //         (error) =>   this.sweetAlert.presentError( error.error.error )
  //         );

  //       }
  //     });
  // }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
   }


  // openCreateDialog(category?: Category)
  // {
  //   let data;
  //   // Quiero crear una nueva categoría
  //   if( !category )
  //   {
  //     data = {name: '', id: '', state: false};
  //   }
  //   else
  //   {
  //     data = category;
  //   }

  //   const dialogCreateRef = this.dialog.open(CreateCategoryDialogComponent, { data });

  //   dialogCreateRef.afterClosed().subscribe(
  //     res => {     
  //       console.log("esta es la respuestaaaaaaaa");
  //       console.log(res);
  //       if(res)
  //       {
  //         // Esta validación se hace cuando se le da enter en vez de en el boton aceptar.
  //         if(res.data)
  //         {
  //           res = res.data;
  //         }

  //         if(res.name === '')
  //         {
  //           this.sweetAlert.presentError('Ingrese un nombre para la categoría');
  //           this.openCreateDialog();
  //         }

  //         // Quiero crear una nueva categoría
  //         if( !category )
  //         {
  //           this.createCategory(res.name);
  //         }
  //         else
  //         {
  //           this.updateCategory(res);
  //         }
  //       }        
  //     }
  //   );
  // }

  /**
   * Crea una nueva categoría de productos en la base de datos.
   * @param name Nombre de la categoría a crear.
   */
  // createCategory(name: string)
  // {
  //   this.categoryService.createCategory( name ).subscribe(
  //     category => {
  //       this.sweetAlert.presentSuccess(`Categoría ${category.name} Creada Correctamente!`);
  //       // Refrescando la tabla
  //       this.loadData();
  //     },
  //     error => {
  //       this.sweetAlert.presentError( error.error.error );
  //     }
  //   );
  // }

  /**
   * Actualiza los datos de una categoria en la base de datos.
   * @param category Categoria por actualizar.
   */
  // updateCategory( category: Category )
  // {
  //   this.categoryService.updateCategory( category.id, category ).subscribe(
  //     category => {
  //       this.sweetAlert.presentSuccess(`Categoría ${category.name} Actualizada Correctamente!`);
  //       // Refrescando la tabla
  //       this.loadData();
  //     },
  //     error => {
  //       const { msg } = error.error;
  //       this.sweetAlert.presentError( msg );
  //     }
  //   );
  // }

  /**
   * Elimina una categoria en la base de datos.
   * @param category Categoría para eliminar.
   */
  deleteCategory( category: Category )
  {
    this.sweetAlert.presentDelete( category.name )
      .then((result) => {
        if (result.isConfirmed) 
        {
          this.categoryService.deleteCategory( category.id ).subscribe(
            res => {
              console.log(res);
              this.sweetAlert.presentSuccess(`Eliminadá categoría: ${res.name}`);
              this.loadData();
            },
            error => {
              console.log(error);
            }
          );
        }
      });
  }

}
