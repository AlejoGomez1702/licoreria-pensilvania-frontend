import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/dashboard/users/services/user/user.service';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit
{
  panelOpenState = false;
  userImg = '';
  userName = '';

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
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void 
  {    
    this.screenWidth = window.innerWidth || 1000;
    // console.log(this.screenWidth);

    this.userService.getLoggedUser().subscribe(
      (res) => {
        this.userImg = res?.user.img || 'assets/images/user-default.svg';
        this.userName= res?.user.name;
      }
    )
  }

  ngAfterViewInit(): void 
  {
    // this.screenWidth = window.innerWidth || 1000;
    console.log(this.screenWidth);
    // console.log(this.sidenav);
    // this.sidenavService.setSidenav(this.sidenav);
    // this.closeNavMobile();
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

  goToProviders(): void
  {
    this.router.navigate(['/dashboard/providers']);
  }

}
