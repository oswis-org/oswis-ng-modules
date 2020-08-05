import { Input, Directive } from '@angular/core';
import {ApiEntityEditComponent} from "../components/api-entity-edit.component";
import {ApiEntityEditorComponent} from "../components/api-entity-editor.component";
import {ApiEntitySingleAbstractComponent} from "../components/api-entity-single.abstract.component";

@Directive()
export abstract class AbstractActionComponent {
  @Input() component: ApiEntitySingleAbstractComponent;
  @Input() empty = false;

  isEdit(): boolean {
    return this.component instanceof ApiEntityEditComponent || this.component instanceof ApiEntityEditorComponent;
  }
}
