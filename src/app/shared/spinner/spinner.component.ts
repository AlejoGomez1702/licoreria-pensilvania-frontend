import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit
{

  public isLoading: Subject<boolean> = new Subject();

  constructor(
    private spinnerService: SpinnerService
  ) 
  {}

  ngAfterViewInit(): void 
  {
    // Promise.resolve().then(() => this.isLoading = this.spinnerService.isLoading);

    // setTimeout(() => {
    //   this.isLoading = this.spinnerService.isLoading;
    // }, 0); 
  }

  ngOnInit(): void 
  {
    Promise.resolve().then(() => this.isLoading = this.spinnerService.isLoading);
    // this.isLoading = this.spinnerService.isLoading;
    // setTimeout(() => {
    //   this.isLoading = this.spinnerService.isLoading;
    // }, 0);    
  }

}
