import {ApiEntityListAlignEnum} from '../enums/api-entity-list-align.enum';
import {ApiEntityListTypeEnum} from '../enums/api-entity-list-type.enum';
import {ColumnDefinitionValuesModel} from "./column-definition-values.model";

export class ColumnDefinitionModel {
  name?: string = null;
  title?: string = null;
  sticky?: boolean = false;
  align?: ApiEntityListAlignEnum = ApiEntityListAlignEnum.LEFT;
  searcheable?: boolean | string | null = false;
  sortable?: string | boolean | null = null;
  type?: ApiEntityListTypeEnum = null;
  subType?: string = null;
  child?: string = null;
  prepend?: string = '';
  append?: string = '';
  fontSize?: any = null;

  constructor(values: ColumnDefinitionValuesModel = null) {
    this.name = values.name || this.name;
    this.title = values.title || this.title;
    this.sticky = this.sticky || values.sticky;
    this.align = values.align || this.align;
    this.searcheable = this.searcheable || values.searcheable;
    this.sortable = values.sortable || null;
    this.type = values.type || this.type;
    this.subType = values.subType || this.subType;
    this.child = values.child || this.child;
    this.prepend = values.prepend || this.prepend;
    this.append = values.append || this.append;
    this.fontSize = values.fontSize || this.fontSize;
  }

  // public getHeaderAlign(): string {
  //   switch (this.align) {
  //     case COL_ALIGN.RIGHT:
  //       return 'flex-end';
  //     case COL_ALIGN.CENTER:
  //       return 'center';
  //   }
  //   return 'flex-start';
  // }

  public getSortable(): string | null {
    if (false === this.sortable) {
      return null;
    }
    if (null == this.sortable || '' == this.sortable) {
      return this.name;
    }
    if (this.sortable == 'string') {
      return this.sortable;
    }

    return null;
  }

  public getAlign(): string {
    return this.align + ' ' + (this.fontSize ? 'font-' + this.fontSize : '');
  }

  public getPrepend(): string {
    return this.prepend ? '' + this.prepend : '';
  }

  public getAppend(): string {
    return this.append ? '' + this.append : '';
  }
}
