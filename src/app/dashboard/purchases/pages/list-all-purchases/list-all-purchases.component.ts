import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/app-routes';

@Component({
  selector: 'app-list-all-purchases',
  templateUrl: './list-all-purchases.component.html',
  styleUrls: ['./list-all-purchases.component.scss']
})
export class ListAllPurchasesComponent implements OnInit 
{
  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = ['date', 'total', 'utility', 'client', 'user', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private router: Router
  ) 
  { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  filterPurchases()
  {

  }

  goToCreatePurchase(): void
  {
    this.router.navigate([appRoutes.createPurchase]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
