import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/dashboard/users/services/user/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit 
{
  panelOpenState = false;
  userImg = '';
  userName = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(
      (res) => {
        this.userImg = res?.user.img;
        this.userName= res?.user.name;
      }
    )
  }

}
