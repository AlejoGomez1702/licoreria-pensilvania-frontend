import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit 
{
  public homeRoute: boolean = false;
  public productsRoute: boolean = false;
  public contactRoute: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    this.loadActiveRoute();
  }

  loadActiveRoute(): void
  {
    const route = this.router.url;
    switch (route) 
    {
      case '/':
        this.homeRoute = true;
        this.productsRoute = false;
        this.contactRoute = false;  
      break;

      case '/products':
        this.homeRoute = false;
        this.productsRoute = true;
        this.contactRoute = false;  
      break;

      case '/contact':
        this.homeRoute = false;
        this.productsRoute = false;
        this.contactRoute = true;  
      break;
    
      default:
        break;
    }

  }

}
