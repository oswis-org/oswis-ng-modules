import {ComponentType} from "@angular/cdk/overlay";
import {ListOperationActionType} from "./list-operation-action.type";

export class ListOperationModel {
  name: string = null;
  icon: string = null;
  extraData?: object = {};
  componentType?: ComponentType<any>;
  isDialog?: boolean = false;

  action: (object?: object, callback?: ListOperationActionType) => void = () => {
  };
}
