import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { RuntimeCompiler} from '@angular/compiler';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit 
{

  constructor(
    // private compiler: Compiler,
    private router: Router
  ) 
  { }

  ngOnInit(): void 
  { 
    // this.compiler.clearCache();
  }

  goToRoute( route: string )
  {
    this.router.navigate([route]);
  }

}
