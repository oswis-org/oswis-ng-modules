import {KeyValue} from "@angular/common";

export class FilterKeyValue implements KeyValue<string, string | number | boolean> {
  key: string;
  value: string | number | boolean;
}
