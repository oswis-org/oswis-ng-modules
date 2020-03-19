import {ApiEntityListAlignEnum} from '../enums/api-entity-list-align.enum';
import {ApiEntityListTypeEnum} from '../enums/api-entity-list-type.enum';

export class ColumnDefinitionValuesModel {
  name?: string;
  title?: string;
  sticky?: boolean;
  align?: ApiEntityListAlignEnum;
  searcheable?: boolean;
  sortable?: string | boolean;
  type?: ApiEntityListTypeEnum;
  subType?: string;
  child?: string;
  prepend?: string;
  append?: string;
  fontSize?: any;
}
