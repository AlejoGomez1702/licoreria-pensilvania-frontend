import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Provider } from '../../interfaces/provider.interface';
import { ProviderService } from '../../services/provider.service';
import { ChangeDetectorRef } from '@angular/core';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { FormProviderComponent } from './form-provider/form-provider.component';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';

@Component({
  selector: 'app-crud-providers',
  templateUrl: './crud-providers.component.html',
  styleUrls: ['./crud-providers.component.scss']
})
export class CrudProvidersComponent implements OnInit {

  displayedColumns = ['name', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  
  constructor(
    private providerService: ProviderService,
    private sweetAlert: SweetAlertService,
    private crudService: CrudService,
    private changeRef: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
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
    this.providerService.getAllProviders()
    .subscribe(res => {
      console.log('Resultado: ', res);
      this.dataSource.data = res.providers;
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
      title: 'Crear proveedor',
      component: FormProviderComponent,
      dataComponent: {
        insertMode: true,
      },
      actions: {
        primary: 'Guardar'
      },
      maxWidth: '500px',
    }).subscribe((resultado) => {
      if (resultado.estado) {
        const provider = resultado.data as Provider;
        console.log('Proveedor: ', provider);
        this.providerService.createProvider(provider).subscribe((res: any)=>{
          console.log('Retorno: ', res);
          const oldData= this.dataSource.data;
          this.dataSource = new MatTableDataSource([{id:res?.id, provider:res?.provider},...oldData] );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if(res){
            this.sweetAlert.presentSuccess(`Proveedor ${provider.name} Creado Correctamente!`);
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

  edit(row: Provider){
    this.subscription=this.crudService.show({
      title: 'Editar proveedor',
      component: FormProviderComponent,
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
        const provider = resultado.data as Provider;
          this.providerService.updateProvider(provider).subscribe(
            () =>{
              this.loadData();
              this.sweetAlert.presentSuccess(`Proveedor ${provider.name} Editado Correctamente!`);
              this.crudService.close();
          },
          (error) =>   this.sweetAlert.presentError( error.error.error )
          );

        }
      });
  }

  delete(row: Provider){
    this.subscription=this.crudService.show({
      title: 'Eliminar proveedor',
      component: FormProviderComponent,
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
        const provider = resultado.data as Provider;
          this.providerService.deleteProvider(provider.id).subscribe(
            () =>{
              this.loadData();
              this.sweetAlert.presentSuccess(`Proveedor ${row.name} Eliminado Correctamente!`);
              this.crudService.close();
          },
          (error) =>   this.sweetAlert.presentError( error.error.error )
          );

        }
      });
  }

}
