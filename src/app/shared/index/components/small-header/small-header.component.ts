import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-small-header',
  templateUrl: './small-header.component.html',
  styleUrls: ['./small-header.component.scss']
})
export class SmallHeaderComponent implements OnInit 
{
  // Hay un usuario logueado o NO en el sistema.
  public isLogued: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void 
  {
    this.isUserLogued();
  }

  goToLogin(): void 
  {
    this.router.navigate(['/auth/login']);
  }

  goToDashboard(): void 
  {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Verifica si hay un usuario logueado o no.
   */
  isUserLogued()
  {
    const token = this.tokenService.getToken();
    if( token )
    {
      this.authService.getUserLogued().subscribe(
        () => this.isLogued = true,
        () => {
        this.isLogued = false;
        this.tokenService.clearToken();
        }
      );
    }
    else
    {
      this.isLogued = false;
    }
  }

}
