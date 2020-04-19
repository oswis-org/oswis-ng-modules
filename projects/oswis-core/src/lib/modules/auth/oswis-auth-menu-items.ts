import {MenuItemModel} from "@oswis-org/oswis-shared";

export const OSWIS_AUTH_MENU_ITEMS: MenuItemModel[] = [
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

