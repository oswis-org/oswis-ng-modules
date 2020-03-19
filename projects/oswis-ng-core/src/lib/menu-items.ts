import {MenuItemModel} from './models/menu-item.model';

export const MENU_ITEMS: MenuItemModel[] = [
  new MenuItemModel(
    '/address-book',
    'Adresář',
    [
      new MenuItemModel(
        '/address-book/person',
        'Lidé',
        [],
        'person'
      ),
      new MenuItemModel(
        '/address-book/organization',
        'Organizace',
        [],
        'business'
      ),
      new MenuItemModel(
        '/address-book/place',
        'Místa',
        [],
        'place'
      ),
    ],
    'contacts'
  ),
  new MenuItemModel(
    '/calendar',
    'Události',
    [
      new MenuItemModel(
        '/calendar/event',
        'Přehled událostí',
        [],
        'date_range'
      ),
      new MenuItemModel(
        '/calendar/event-participant',
        'Účastníci',
        [],
        'person'
      ),
    ],
    'date_range'
  ),
  new MenuItemModel(
    '/app-user',
    'Uživatelé',
    [
      new MenuItemModel(
        '/app-user/user',
        'Přehled uživatelů',
        [],
        'person'
      ),
      new MenuItemModel(
        '/app-user/type',
        'Typy uživatelů',
        [],
        'person'
      ),
    ],
    'person'
  ),
];

export const PROFILE_MENU_ITEMS: MenuItemModel[] = [
  new MenuItemModel(
    'auth',
    'Akce uživatele',
    [
      new MenuItemModel(
        'auth/user',
        'Profil',
        [],
        'account_box'
      ),
      new MenuItemModel(
        'auth/change-password',
        'Změna hesla',
        [],
        'fingerprint'
      ),
      new MenuItemModel(
        'auth/logout',
        'Odhlášení',
        [],
        'lock'
      ),
    ],
    'account_box'
  ),
];
