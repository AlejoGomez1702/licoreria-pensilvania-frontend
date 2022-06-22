import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginResponse } from './auth/interfaces/LoginResponse';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  loading = false;

  constructor(    
    private authService: AuthService,
    private ngxPermissionsService: NgxPermissionsService,
    private router: Router
  ) 
  {
    this.loadRoutingSpinner();
  }

  ngOnInit(): void 
  {
    this.loadRolesAndPermissions();
    // const rol = "ADMIN_ROLE";
    //     const permissions = [ rol ];
    //     this.ngxPermissionsService.loadPermissions( permissions );

    // this.authService.getUserLogued().subscribe(
    //   (res) => {        
    //     console.log("resssss",res);
    //     const loginResponse = res as LoginResponse;
    //     const { rol } = loginResponse.user;
    //     const permissions = [ rol ];
    //     console.log("Estos son los Roles:  ", permissions);
    //     this.ngxPermissionsService.loadPermissions( permissions );
    //   },
    //   error => console.log(error)
    // );
  }

  loadRolesAndPermissions()
  {
    this.authService.getUserLogued().subscribe(
      (res) => {        
        const loginResponse = res as LoginResponse;
        const { rol } = loginResponse.user;
        const permissions = [ rol ];
        this.ngxPermissionsService.loadPermissions( permissions );
      },
      error => console.log(error)
    );
  }

  loadRoutingSpinner(): void
  {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

}
