import {ListOperationActionType} from "./list-operation-action.type";
import {ComponentType} from "@angular/cdk/overlay";

export class ListActionModel {
  name: string = null; // Name of action ("delete items").
  icon: string = null; // Name of icon of action ("trash").

  data?: object = {}; // Data passed to dialog or action.
  dialog?: ComponentType<any> = null; // Dialog component type. Action is called after dialog confirmation when not null.

  badge?: () => string = null;

  // Function for process selected items (directly, or after dialog is confirmed).
  action: ListOperationActionType = () => null;
}
