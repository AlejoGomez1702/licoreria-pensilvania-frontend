import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { LoginData } from '../../interfaces/LoginData';
import { AuthService } from '../../services/auth.service';
declare const loginScript: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  public loginData: LoginData = {
    email: '',
    password: '',
    remember: false
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit(): void 
  {
    loginScript();
  }

  goToHome()
  {
    this.router.navigate(['/']);
  }

  /**
   * Verifica en el backend si los datos ingresados corresponden a un usuario registrado.
   */
  login()
  {
    if(this.verifyLogin())
    {
      this.authService.login(this.loginData).subscribe(
        res => {
          if(res.token)
          {
            const establishment = res.user.establishment._id || '';
            console.log(establishment);
            // Guardar en el localstorage
            localStorage.setItem('x-token', res.token);
            localStorage.setItem('establishment', establishment);
            localStorage.setItem('pruebaaaa', 'jajajajajjajaja');
            this.router.navigate(['/dashboard']);
          }        
        },
        error => {
          console.log(error);
          this.sweetAlert.presentError( error.error.error );
        }
      );
    }
    else
    {
      this.sweetAlert.presentError( 'Verifique los datos de ingreso!' )
    }
  }

  /**
   * Verifica datos del login antes de enviar al backend.
   */
  verifyLogin(): boolean
  {
    if( this.loginData.email && this.loginData.password && this.loginData.password.length >= 8 )
    {
      return true;
    }

    return false;
  }

}
