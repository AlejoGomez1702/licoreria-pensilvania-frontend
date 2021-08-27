import { AfterViewInit, Component, ViewChild, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { FormUnidadComponent } from './form-unidad/form-unidad.component';
import { Unit } from '../../interfaces/unidad-medida.interface';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-crud-unidades-medida',
  templateUrl: './crud-unidades-medida.component.html',
  styleUrls: ['./crud-unidades-medida.component.scss']
})
export class CrudUnidadesMedidaComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  displayedColumns = ['unit', 'ml','actions'];
  dataSource: MatTableDataSource<Unit>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  constructor(
    private unidadMedidaService: UnidadMedidaService,
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
    this.unidadMedidaService.getAllUnidades()
    .subscribe(res => {
      this.dataSource.data = res.units;
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
    this.subscription=this.crudService.show({
      title: 'Crear unidad de medida',
      component: FormUnidadComponent,
      dataComponent: {
        insertMode: true,
      },
      actions: {
        primary: 'Guardar'
      },
      maxWidth: '600px',
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const unidad = resultado.data as Unit;
        this.unidadMedidaService.createUnidad(unidad).subscribe((res: any)=>{
          const oldData= this.dataSource.data;
          this.dataSource = new MatTableDataSource([{id:res?.id, unit:res?.unit, ml: res?.ml},...oldData] );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if(res){
            this.sweetAlert.presentSuccess(`Unidad ${unidad.unit} Creada Correctamente!`);
            this.crudService.close();
          }else{
            this.sweetAlert.presentError( "Problemas" );
          }
        }  ,(error: any) => {
        this.sweetAlert.presentError( error.error.error );
      });
      }
      
    });
  }
  edit(row: Unit){
    this.subscription=this.crudService.show({
      title: 'Editar unidad de medida',
      component: FormUnidadComponent,
      dataComponent: {
        viewMode: false,
        insertMode: false,
        editMode:true,
        row
      },
      maxWidth: '600px',
      actions: {
        primary: 'Guardar'
      }
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const uni = resultado.data as Unit;
          this.unidadMedidaService.updateUnidad(uni).subscribe(
            () =>{
              this.loadData();
              this.sweetAlert.presentSuccess(`Unidad ${uni.unit} Editada Correctamente!`);
              this.crudService.close();
          },
          (error) =>   this.sweetAlert.presentError( error.error.error )
          );

        }
      });
  }

  // delete(row: UnidadMedida){
  //   this.subscription=this.crudService.show({
  //     title: 'Eliminar unidad de medida',
  //     component: FormUnidadComponent,
  //     dataComponent: {
  //       viewMode: false,
  //       insertMode: false,
  //       editMode:false,
  //       deleteMode:true,
  //       row
  //     },
  //     maxWidth: '600px',
  //     actions: {
  //       primary: 'Guardar'
  //     }
  //   }).subscribe((resultado) => {
  //     if (resultado.estado) {
  //       const uni = resultado.data as UnidadMedida;
  //         this.unidadMedidaService.deleteUnidad(uni.id).subscribe(
  //           () =>{
  //             this.loadData();
  //             this.sweetAlert.presentSuccess(`Unidad ${uni.unit} Eliminada Correctamente!`);
  //             this.crudService.close();
  //         },
  //         (error) =>   this.sweetAlert.presentError( error.error.error )
  //         );

  //       }
  //     });
  // }

  /**
   * Elimina una categoria en la base de datos.
   * @param unit Categoría para eliminar.
   */
   deleteUnit( unit: Unit )
   {
     this.sweetAlert.presentDelete( `${ unit.unit } (${ unit.ml } ml)` )
       .then((result) => {
         if (result.isConfirmed) 
         {
           this.unidadMedidaService.deleteUnidad( unit.id ).subscribe(
             res => {
               console.log(res);
               this.sweetAlert.presentSuccess(`Eliminadá unidad de medida: ${res.unit} (${res.ml} ml)`);
               this.loadData();
             },
             error => {
               console.log(error);
             }
           );
         }
       });
   }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
   }
}
