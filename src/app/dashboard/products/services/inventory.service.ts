import { Component, Injectable } from '@angular/core';
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

}
