import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { MovementDialogComponent } from '../../components/movement-dialog/movement-dialog.component';
import { Movement } from '../../interfaces/Movement';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-box-panel',
  templateUrl: './box-panel.component.html',
  styleUrls: ['./box-panel.component.scss']
})
export class BoxPanelComponent implements OnInit 
{
  // Selección de rango de fechas
  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  // *********** ENTRADAS *********** ENTRADAS *********** ENTRADAS ***********  //
  public entries: Movement[] = [];

  public displayedColumns = ['amount', 'description', 'date', 'user'];
  public dataSourceEntries: MatTableDataSource<Movement>;

  @ViewChild(MatSort) sortEntries!: MatSort;

  // MatPaginator configuration  
  public from: number = 0;
  public length: number = 0;
  public pageSize: number = 8;
  public pageSizeOptions: number[] = [4, 8, 16, 32];
  pageEvent!: PageEvent;

  // *********** SALIDAS *********** SALIDAS *********** SALIDAS ***********  //
  public exits: Movement[] = [];

  public dataSourceExits: MatTableDataSource<Movement>;

  @ViewChild(MatSort) sortExits!: MatSort;

  // MatPaginator configuration  
  public fromExits: number = 0;
  public lengthExits: number = 0;
  public pageSizeExits: number = 8;
  public pageSizeOptionsExits: number[] = [4, 8, 16, 32];
  pageEventExits!: PageEvent;

  constructor(
    private movementService: MovementService,
    private sweetAlert: SweetAlertService,
    public dialog: MatDialog
  ) 
  { 
    this.dataSourceEntries = new MatTableDataSource();
    this.dataSourceExits = new MatTableDataSource();
  }

  get getTotalEntries(): number
  {    
    const individualTotals = this.entries.map(p => (p.amount));
    const total = individualTotals.reduce(( a, b ) => a + b, 0);
    
    return total;
  }

  get getTotalExits(): number
  {    
    const individualTotals = this.exits.map(p => (p.amount));
    const total = individualTotals.reduce(( a, b ) => a + b, 0);
    
    return total;
  }

  ngOnInit(): void 
  {
    this.loadMovements('entry');
    this.loadMovements('exit');
  }

  /**
   * 
   * @param type entry  | exit
   */
  addMovement( type: string )
  {
    const dialogRef = this.dialog.open(MovementDialogComponent, {
      width: '250px',
      data: type,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      // Crear movimiento en el sistema.
      this.movementService.createMovement( result ).subscribe(
        movement => {
          this.loadMovements('entry');
          this.loadMovements('exit');
          this.sweetAlert.presentSuccess(`Movimiento ${movement.description} Creado!`)
        },
        error => console.log(error)
      );
    });
  }

  loadMovements(type?: string, limit?: number, from?: number): void
  {
    this.movementService.getAllMovements(type, limit, from)
    .subscribe(
      res => {
        console.log("Movimientooooosss: ",res);
        if( type && type === 'entry' )
        {
          this.entries = res.movements;   
          this.length = res.total;
          this.dataSourceEntries.data = this.entries;
        }
        else
        {
          this.exits = res.movements;   
          this.lengthExits = res.total;
          this.dataSourceExits.data = this.exits;
        }
      },
      error => this.sweetAlert.presentError(error.error.error)
    );
  }

  filterBox()
  {

  }

  paginateChange( event:PageEvent, type: string ): PageEvent
  {
    if( type && type === 'entry' )
    {
      this.length = event.length;
      this.pageSize = event.pageSize;
      this.from = event.pageIndex * this.pageSize;
    }
    else
    {
      this.lengthExits = event.length;
      this.pageSizeExits = event.pageSize;
      this.fromExits = event.pageIndex * this.pageSize;
    }

    this.loadMovements( type, this.pageSize, this.from );

    return event;
  }

}
