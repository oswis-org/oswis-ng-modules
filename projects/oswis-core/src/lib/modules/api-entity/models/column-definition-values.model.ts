import {ApiEntityListAlignEnum} from '../enums/api-entity-list-align.enum';
import {ApiEntityListTypeEnum} from '../enums/api-entity-list-type.enum';
import {ApiEntityService} from "../services/api-entity.service";

export class ColumnDefinitionValuesModel {
  name?: string;
  title?: string;
  sticky?: boolean;
  align?: ApiEntityListAlignEnum;
  searcheable?: boolean | string | null;
  sortable?: string | boolean | null;
  type?: ApiEntityListTypeEnum;
  subType?: string;
  child?: string;
  prepend?: string;
  append?: string;
  fontSize?: any;
  service?: ApiEntityService;
}


