import {ApiEntityListAlignEnum} from '../enums/api-entity-list-align.enum';
import {ApiEntityListTypeEnum} from '../enums/api-entity-list-type.enum';
import {ColumnDefinitionValuesModel} from './column-definition-values.model';

export class ColumnDefinitionModel {
  name: string = null;
  title: string = null;
  sticky = false;
  align: ApiEntityListAlignEnum = ApiEntityListAlignEnum.LEFT;
  searcheable = false;
  sortable?: string | boolean;
  type?: ApiEntityListTypeEnum = null;
  subType?: string = null;
  child?: string = null;
  prepend = '';
  append = '';
  fontSize?: any = null;

  constructor(values: ColumnDefinitionValuesModel = null) {
    this.name = values.name || this.name;
    this.title = values.title || this.title;
    this.sticky = this.sticky || values.sticky;
    this.align = values.align || this.align;
    this.searcheable = this.searcheable || values.searcheable;
    this.sortable = values.sortable || false;
    this.type = values.type || this.type;
    this.subType = values.subType || this.subType;
    this.child = values.child || this.child;
    this.prepend = values.prepend || this.prepend;
    this.append = values.append || this.append;
    this.fontSize = values.fontSize || this.fontSize;
  }

  // public getHeaderAlign(): string {
  //   switch (this.align) {
  //     case ApiEntityListAlignEnum.RIGHT:
  //       return 'flex-end';
  //     case ApiEntityListAlignEnum.CENTER:
  //       return 'center';
  //   }
  //   return 'flex-start';
  // }

  public isSortable(): boolean {
    return null != this.getSortableName() && typeof this.getSortableName() === 'string';
  }

  public getSortableName(): string | null {
    if (this.sortable === true && typeof this.name === 'string') {
      return '' + this.name;
    }
    if (this.sortable && typeof this.sortable === 'string') {
      return '' + this.sortable;
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
