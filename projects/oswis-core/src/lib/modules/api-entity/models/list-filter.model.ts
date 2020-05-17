import {ApiEntityService} from "../services/api-entity.service";
import {ApiEntityListTypeEnum} from "../enums/api-entity-list-type.enum";

export class ListFilterModel<Type extends ApiEntityService = ApiEntityService> {
  column?: string;
  columnType?: ApiEntityListTypeEnum;
  key?: string;
  type?: string;
  inputType?: string;
  title?: string;
  service?: Type;
  value?: string | number | null;
}
