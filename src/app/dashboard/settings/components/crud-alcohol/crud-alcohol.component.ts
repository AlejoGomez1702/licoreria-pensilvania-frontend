import { AfterViewInit, Component, ViewChild, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { FormAlcoholComponent } from './form-alcohol/form-alcohol.component';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alcohol } from '../../interfaces/alcohol.interface';
import { AlcoholService } from '../../services/alcohol.service';

@Component({
  selector: 'app-crud-alcohol',
  templateUrl: './crud-alcohol.component.html',
  styleUrls: ['./crud-alcohol.component.scss']
})
export class CrudAlcoholComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  displayedColumns = ['alcohol','actions'];
  dataSource: MatTableDataSource<Alcohol>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  constructor(
    private alcoholService: AlcoholService,
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
    this.alcoholService.getAllAlcohol()
    .subscribe(res => {
      this.dataSource.data = res.alcohols;
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
      title: 'Crear alcohol',
      component: FormAlcoholComponent,
      dataComponent: {
        insertMode: true,
      },
      actions: {
        primary: 'Guardar'
      },
      maxWidth: '500px',
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const alcohol = resultado.data as Alcohol;
        this.alcoholService.createAlcohol(alcohol).subscribe((res: any)=>{
          const oldData= this.dataSource.data;
          this.dataSource = new MatTableDataSource([{id:res?.id, alcohol:res?.alcohol},...oldData] );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if(res){
            this.sweetAlert.presentSuccess(`Alcohol ${alcohol.alcohol} Creado Correctamente!`);
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
  edit(row: Alcohol){
    this.subscription=this.crudService.show({
      title: 'Editar alcohol',
      component: FormAlcoholComponent,
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
        const alcoh = resultado.data as Alcohol;
          this.alcoholService.updateAlcohol(alcoh).subscribe(
            () =>{
              this.loadData();
              this.sweetAlert.presentSuccess(`Alcohol ${alcoh.alcohol} Editado Correctamente!`);
              this.crudService.close();
          },
          (error) =>   this.sweetAlert.presentError( error.error.error )
          );

        }
      });
  }
  delete(row: Alcohol){
    this.subscription=this.crudService.show({
      title: 'Eliminar alcohol',
      component: FormAlcoholComponent,
      dataComponent: {
        viewMode: false,
        insertMode: false,
        editMode:false,
        deleteMode:true,
        row
      },
      maxWidth: '500px',
      actions: {
        primary: 'Guardar'
      }
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const alcoh = resultado.data as Alcohol;
          this.alcoholService.deleteAlcohol(alcoh.id).subscribe(
            () =>{
              this.loadData();
              this.sweetAlert.presentSuccess(`Alcohol ${row.alcohol} Eliminado Correctamente!`);
              this.crudService.close();
          },
          (error) =>   this.sweetAlert.presentError( error.error.error )
          );

        }
      });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
   }
}
