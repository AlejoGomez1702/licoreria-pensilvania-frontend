import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/dashboard/users/services/user/user.service';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit
{
  panelOpenState = false;
  userImg = '';
  public userName: string = '';
  public userRol: string = '';
  public establishment: string = '';

  screenWidth: number = 1000;

  // sidenav: any;

  // drawer: any;

  // @ViewChild('sidenav') public sidenav!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void 
  {    
    this.screenWidth = window.innerWidth || 1000;
    // console.log(this.screenWidth);

    this.authService.getUserLogued().subscribe(
      (res) => {
        // console.log("Initttttt: ", res);
        this.userImg = res?.user.img || 'assets/images/user-default.svg';
        this.userName= res?.user.name;
        this.userRol = res?.user.rol;
        this.establishment = res.user.establishment.name;
      }
    );
  }

  ngAfterViewInit(): void 
  {
    // this.screenWidth = window.innerWidth || 1000;
    // console.log(this.screenWidth);
    // console.log(this.sidenav);
    // this.sidenavService.setSidenav(this.sidenav);
    // this.closeNavMobile();
  }

  get shortName()
  {
    const fullName = this.userName.split(' ');
    const [ first, last ] = fullName;
    return first + ' ' + last;
  }

  logout(): void
  {
    this.tokenService.clearToken();
    this.router.navigate(['/']);    
  }

  // closeNavMobile(): void
  // {
  //   const screenWidth = window.innerWidth || 1000;
  //   if( screenWidth < 700 )
  //   {
  //     // this.drawer.toggle();
  //     // this.sidenav.close();
  //   }
  // }

  // closeAllSidenav() {
  //   this.isHandset$.subscribe(isVisible => {
  //     if(isVisible) {
  //       this.myDrawer.close();
  //     }
  //   });
  // }

  goToSettings(): void
  {
    this.router.navigate(['/dashboard/settings']);    
  }

  goToProducts(): void
  {
    this.router.navigate(['/dashboard/products']);
  }

  goToSales(): void
  {
    this.router.navigate(['/dashboard/sales']);
  }

  goToPurchases(): void
  {
    this.router.navigate(['/dashboard/purchases']);
  }

  goToProviders(): void
  {
    this.router.navigate(['/dashboard/providers']);
  }

  goToClients(): void
  {
    this.router.navigate(['/dashboard/clients']);
  }

  goToBox(): void
  {
    this.router.navigate(['/dashboard/box']);
  }

  goToPruchasesVsSales(): void
  {
    this.router.navigate(['/dashboard/products/purchasesvssales']);
  }

}
