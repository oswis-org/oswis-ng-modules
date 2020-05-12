import {ApiEntityService} from "../services/api-entity.service";

export class ListFilterModel<Type extends ApiEntityService = ApiEntityService> {
  column?: string;
  key?: string;
  type?: string;
  title?: string;
  service?: Type;
  value?: string | number | null;
}
