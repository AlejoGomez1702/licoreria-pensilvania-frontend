import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/dashboard/settings/interfaces/unidad-medida.interface';
import { UnidadMedidaService } from 'src/app/dashboard/settings/services/unidad-medida.service';
import { CrudService } from 'src/app/shared/services/dialog/crud.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../interfaces/Product';
import { Spirit } from '../../interfaces/Spirit';
import { ProductService } from '../../services/product.service';
import { SpiritService } from '../../services/spirit.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements OnInit 
{
  constructor() 
  { 
    
  }

  ngOnInit(): void 
  {
  }

  ngAfterViewInit() {
  }

}
