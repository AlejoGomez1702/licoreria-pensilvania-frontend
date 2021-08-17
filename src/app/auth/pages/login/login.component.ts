import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const loginScript: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void 
  {
    loginScript();
  }

  goToHome()
  {
    this.router.navigate(['/']);
  }

  goToDashboard()
  {
    this.router.navigate(['/dashboard']);
  }

}
