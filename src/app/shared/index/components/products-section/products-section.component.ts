import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/dashboard/products/interfaces/Product';
import { SpiritsLicoreriaService } from '../../services/spirits-licoreria.service';
declare const main: any;

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements OnInit 
{
  public products: Product[] = [];

  constructor(
    private spiritsLicoreriaService: SpiritsLicoreriaService
  ) 
  {  }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData(): void
  {
    this.spiritsLicoreriaService.getMainSpirits().subscribe(
      res => {
        this.products = res.spirits;
        main();
        console.log(this.products);
      },
      error => {
        console.log(error);
      }
    );
  }

}
