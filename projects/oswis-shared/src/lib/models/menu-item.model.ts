export class MenuItemModel {

  slug: string;
  name: string;
  subItems: MenuItemModel[];
  symbol: string;

  constructor(slug: string, name: string, subItems: MenuItemModel[] = [], symbol: string = null) {
    this.slug = slug;
    this.name = name;
    this.subItems = subItems;
    this.symbol = symbol;
  }

}
