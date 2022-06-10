import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { appRoutes } from 'src/app/routes/app-routes';
import { NaturistInventoryComponent } from '../components/establishment-naturist/naturist-inventory/naturist-inventory.component';
import { SexShopInventoryComponent } from '../components/establishment-naturist/sex-shop-inventory/sex-shop-inventory.component';
import { CigaretteInventoryComponent } from '../components/establishment-spirit/cigarette-inventory/cigarette-inventory.component';
import { DrinkInventoryComponent } from '../components/establishment-spirit/drink-inventory/drink-inventory.component';
import { GroceryInventoryComponent } from '../components/establishment-spirit/grocery-inventory/grocery-inventory.component';
import { SpiritInventoryComponent } from '../components/establishment-spirit/spirit-inventory/spirit-inventory.component';
import { SuperCategory } from '../interfaces/SuperCategory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService 
{
  constructor() { }

  veryfyInventoryComponent( supercategory: SuperCategory )
  {
    switch (supercategory.component) 
    {
      case 'spirits-inventory':
        return SpiritInventoryComponent;

      case 'cigarettes-inventory':
        return CigaretteInventoryComponent;

      case 'drinks-inventory':
        return DrinkInventoryComponent;

      case 'groceries-inventory':
        return GroceryInventoryComponent;

      case 'naturist-inventory':
        return NaturistInventoryComponent;

      case 'sex-shop-inventory':
        return SexShopInventoryComponent;
    
      default:
        break;
    }

    return  SpiritInventoryComponent;
  }

  verifyCreateProductTitle(productType: string): string
  {
    switch (productType) 
      {
        case 'spirit':
          return '(LICORES)'
        break;

        case 'cigarette':
          return '(CIGARRILLOS)'
        break;

        case 'drink':
          return '(BEBIDAS)'
        break;

        case 'grocery':
          return '(COMESTIBLES)'
        break;
    
        case 'naturist':
          return '(NATURISTAS)'
        break;

        case 'sexshop':
          return '(SEX-SHOP)'
        break;
    
        default: 
          return '';
        break;  
      }
  }

  verifyCreateProductRoute(productType: string): string
  {
    switch (productType) 
    {
      case 'spirit':
        return appRoutes.createSpirit;
      break;

      case 'cigarette':
        return appRoutes.createCigarette;
      break;

      case 'drink':
        return appRoutes.createDrink;
      break;

      case 'grocery':
        return appRoutes.createGrocery;
      break;
  
      case 'naturist':
        return appRoutes.createNaturist;
      break;

      case 'sexshop':
        return appRoutes.createSexshop;
      break;
  
      default: 
        return '';
      break;  
    }
  }

  verifyEditProductRoute(productType: string, id: string): string
  {
    switch (productType) 
    {
      case 'spirit':
        return appRoutes.editSpirit + id;
      break;

      case 'cigarette':
        return appRoutes.editCigarette + id;
      break;

      case 'drink':
        return appRoutes.editDrink + id;
      break;

      case 'grocery':
        return appRoutes.editGrocery + id;
      break;
  
      case 'naturist':
        return appRoutes.editNaturist + id;
      break;

      case 'sexshop':
        return appRoutes.editSexshop + id;
      break;
  
      default: 
        return '';
    }
  }

  verifyCreateProductFormBuilder(productType: string)
  {
    switch (productType) 
    {
      case 'spirit':
        return {
          img:                [],
          category:           [ '', [Validators.required] ],
          name:               [ '', [Validators.required, Validators.minLength(3)] ],
          unit:               [ '', [Validators.required] ],
          barcode:            [ '' ],
          stock:              [ 1, [Validators.required, Validators.min(1)] ],
          purchase_price:     [ 0, [Validators.min(0)] ],
          vol_alcohol:        [ 0, [Validators.min(0), Validators.max(100)] ],
          sale_price:         [ 0, [Validators.min(0)] ],
          second_sale_price:  [ 0, [Validators.min(0)] ],
          current_existence:  [ 0, [Validators.min(0)] ],
          code:               [ '' ]
        };

      case 'cigarette':
        return {
          img:                [],
          category:           [ '', [Validators.required] ],
          name:               [ '', [Validators.required, Validators.minLength(3)] ],
          unit:               [ '', [Validators.required] ],
          barcode:            [ '' ],
          stock:              [ 1, [Validators.required, Validators.min(1)] ],
          purchase_price:     [ 0, [Validators.min(0)] ],
          sale_price:         [ 0, [Validators.min(0)] ],
          current_existence:  [ 0, [Validators.min(0)] ],
          code:               [ '' ]
        };

      case 'drink':
        return {
          img:                [],
          category:           [ '', [Validators.required] ],
          name:               [ '', [Validators.required, Validators.minLength(3)] ],
          unit:               [ '', [Validators.required] ],
          barcode:            [ '' ],
          stock:              [ 1, [Validators.required, Validators.min(1)] ],
          purchase_price:     [ 0, [Validators.min(0)] ],
          sale_price:         [ 0, [Validators.min(0)] ],
          second_sale_price:  [ 0, [Validators.min(0)] ],
          current_existence:  [ 0, [Validators.min(0)] ],
          code:               [ '' ]
        };

      case 'grocery':
        return {
          img:                [],
          category:           [ '', [Validators.required] ],
          name:               [ '', [Validators.required, Validators.minLength(3)] ],
          unit:               [ '', [Validators.required] ],
          barcode:            [ '' ],
          stock:              [ 1, [Validators.required, Validators.min(1)] ],
          purchase_price:     [ 0, [Validators.min(0)] ],
          sale_price:         [ 0, [Validators.min(0)] ],
          current_existence:  [ 0, [Validators.min(0)] ],
          code:               [ '' ]
        };
  
      case 'naturist':
        return {
          img:                [],
          category:           [ '', [Validators.required] ],
          name:               [ '', [Validators.required, Validators.minLength(3)] ],
          unit:               [ '', [Validators.required] ],
          barcode:            [ '' ],
          stock:              [ 1, [Validators.required, Validators.min(1)] ],
          purchase_price:     [ 0, [Validators.min(0)] ],
          sale_price:         [ 0, [Validators.min(0)] ],
          current_existence:  [ 0, [Validators.min(0)] ],
          code:               [ '' ]
        };

      case 'sexshop':
        return {
          img:                [],
          category:           [ '', [Validators.required] ],
          name:               [ '', [Validators.required, Validators.minLength(3)] ],
          unit:               [ '', [Validators.required] ],
          barcode:            [ '' ],
          stock:              [ 1, [Validators.required, Validators.min(1)] ],
          purchase_price:     [ 0, [Validators.min(0)] ],
          sale_price:         [ 0, [Validators.min(0)] ],
          current_existence:  [ 0, [Validators.min(0)] ],
          code:               [ '' ]
        };
  
      default: 
        return {};
    }
  }

}
