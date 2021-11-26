import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Product } from '../../interfaces/Product';
import { SpiritService } from '../../services/spirit.service';

@Component({
  selector: 'app-spirit-inventory',
  templateUrl: './spirit-inventory.component.html',
  styleUrls: ['./spirit-inventory.component.scss']
})
export class SpiritInventoryComponent implements OnInit, AfterViewInit
{
  displayedColumns = ['name', 'unit', 'sale_price', 'stock', 'current_existence', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spiritService: SpiritService,
    private sweetAlert: SweetAlertService,
    private router: Router
  )
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.loadData();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData()
  {
    this.spiritService.getAllProducts()
    .subscribe(res => {
      this.dataSource.data = res.spirits;
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

  createProduct()
  {
    this.router.navigate(['/dashboard/products/create/spirit']);
  }

  editSpirit( row: any )
  {

  }

}
