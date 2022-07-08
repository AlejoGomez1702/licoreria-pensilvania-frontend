import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { appRoutes } from 'src/app/routes/app-routes';
import { NaturistInventoryComponent } from '../components/establishment-naturist/naturist-inventory/naturist-inventory.component';
import { SexShopInventoryComponent } from '../components/establishment-naturist/sex-shop-inventory/sex-shop-inventory.component';
import { CigaretteInventoryComponent } from '../components/establishment-spirit/cigarette-inventory/cigarette-inventory.component';
import { CocktailInventoryComponent } from '../components/establishment-spirit/cocktail-inventory/cocktail-inventory.component';
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

      case 'cocktails-inventory':
        return CocktailInventoryComponent;

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

        case 'cigarette':
          return '(CIGARRILLOS)'

        case 'drink':
          return '(BEBIDAS)'

        case 'grocery':
          return '(COMESTIBLES)'

        case 'cocktail':
          return '(CÓCTELES Y MICHELADAS)'
    
        case 'naturist':
          return '(NATURISTAS)'

        case 'sexshop':
          return '(SEX-SHOP)'
    
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

      case 'cigarette':
        return appRoutes.createCigarette;

      case 'drink':
        return appRoutes.createDrink;

      case 'grocery':
        return appRoutes.createGrocery;

      case 'cocktail':
        return appRoutes.createCocktail;
  
      case 'naturist':
        return appRoutes.createNaturist;

      case 'sexshop':
        return appRoutes.createSexshop;
  
      default: 
        return '';
    }
  }

  verifyEditProductRoute(productType: string, id: string): string
  {
    switch (productType) 
    {
      case 'spirit':
        return appRoutes.editSpirit + id;

      case 'cigarette':
        return appRoutes.editCigarette + id;

      case 'drink':
        return appRoutes.editDrink + id;

      case 'grocery':
        return appRoutes.editGrocery + id;

      case 'cocktail':
        return appRoutes.editCocktail + id;
  
      case 'naturist':
        return appRoutes.editNaturist + id;

      case 'sexshop':
        return appRoutes.editSexshop + id;
  
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

      case 'cocktail':
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
