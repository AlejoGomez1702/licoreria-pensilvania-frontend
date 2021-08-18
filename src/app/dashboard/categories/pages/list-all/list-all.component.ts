import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CreateCategoryDialogComponent } from '../../components/create-category-dialog/create-category-dialog.component';
import { Category } from '../../interfaces/category.interfaces';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements AfterViewInit, OnInit 
{
  displayedColumns = ['name', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService
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

  loadData()
  {
    this.categoryService.getAllCategories()
    .subscribe(res => {
      console.log(res);
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

  openCreateDialog(category?: Category)
  {
    let data;
    // Quiero crear una nueva categoría
    if( !category )
    {
      data = {name: '',id: '',state: false};
    }
    else
    {
      data = category;
    }

    const dialogCreateRef = this.dialog.open(CreateCategoryDialogComponent, { data });

    dialogCreateRef.afterClosed().subscribe(
      res => {     
        if(res)
        {
          if(res.name === '')
          {
            this.sweetAlert.presentError('Ingrese un nombre para la categoría');
            this.openCreateDialog();
          }

          // Quiero crear una nueva categoría
          if( !category )
          {
            this.createCategory(res.name);
          }
          else
          {
            this.updateCategory(res);
          }
        }        
      }
    );
  }

  /**
   * Crea una nueva categoría de productos en la base de datos.
   * @param name Nombre de la categoría a crear.
   */
  createCategory(name: string)
  {
    this.categoryService.createCategory( name ).subscribe(
      category => {
        this.sweetAlert.presentSuccess(`Categoría ${category.name} Creada Correctamente!`);
        // Refrescando la tabla
        this.loadData();
      },
      error => {
        this.sweetAlert.presentError( error.error.error );
      }
    );
  }

  /**
   * Actualiza los datos de una categoria en la base de datos.
   * @param category Categoria por actualizar.
   */
  updateCategory( category: Category )
  {
    this.categoryService.updateCategory( category.id, category ).subscribe(
      category => {
        this.sweetAlert.presentSuccess(`Categoría ${category.name} Actualizada Correctamente!`);
        // Refrescando la tabla
        this.loadData();
      },
      error => {
        const { msg } = error.error;
        this.sweetAlert.presentError( msg );
      }
    );
  }

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
