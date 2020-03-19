import {Injectable} from '@angular/core';
import {MenuItemModel} from '../models/menu-item.model';
import {MENU_ITEMS, PROFILE_MENU_ITEMS} from '../menu-items';

@Injectable({
  providedIn: "root",
})
export class MenuService {
  static getMenuItems(): MenuItemModel[] {
    return MENU_ITEMS;
  }

  static getProfileMenuItems(): MenuItemModel[] {
    return PROFILE_MENU_ITEMS;
  }
}
