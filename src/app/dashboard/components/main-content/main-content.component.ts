import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';
// import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit 
{

  constructor(
    private router: Router,
    // private tokenService: TokenService,
    // private authService: AuthService
  ) 
  { }

  ngOnInit(): void 
  {
    // this.isUserLogued();
  }

  /**
   * Verifica si hay un usuario logueado o no.
   */
  //  isUserLogued()
  //  {
  //    const token = this.tokenService.getToken();
  //    if( token )
  //    {
  //      this.authService.getUserLogued().subscribe(
  //        () => {return},
  //        () => {
  //         this.router.navigate(['/']);
  //         this.tokenService.clearToken()
  //        }
  //      );
  //    }
  //    else
  //    {
  //     this.router.navigate(['/']);
  //    }
  //  }

  goToSettings(): void
  {
    this.router.navigate(['dashboard/settings']);
  }

  goToProducts(): void
  {
    this.router.navigate(['/dashboard/products']);
  }

  goToSale(): void
  {
    this.router.navigate(['/dashboard/sales/create']);
  }

}
