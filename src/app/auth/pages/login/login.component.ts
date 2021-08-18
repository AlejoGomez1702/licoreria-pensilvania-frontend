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

  login()
  {
    // console.log(this.loginData);

    this.authService.login(this.loginData).subscribe(
      res => {
        // Guardar en el localstorage
        localStorage.setItem('x-token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
        this.sweetAlert.presentError( error.error.error );
      }
    );

    // console.log(this.loginData);
    // this.router.navigate(['/dashboard']);
  }

}
