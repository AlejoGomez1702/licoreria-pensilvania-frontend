import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit 
{

  public isLoading: Subject<boolean> = new Subject();

  constructor(
    private spinnerService: SpinnerService
  ) 
  { }

  ngOnInit(): void 
  {
    this.isLoading = this.spinnerService.isLoading;
  }

}
