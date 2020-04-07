import {Component, Input} from '@angular/core';
import {ApiEntityShowComponent} from '../components/api-entity-show.component';
import {ApiEntityEditorComponent} from '../components/api-entity-editor.component';
import {ListActionModel} from "../models/list-action.model";

@Component({
  selector: 'oswis-api-entity-custom-action',
  template: `
    <button (click)="component.getAction(action)" mat-icon-button [matTooltip]="action.name">
      <mat-icon *ngIf="action.icon">{{action.icon}}</mat-icon>
      <span *ngIf="isLink">{{ action.name }}</span>
    </button>
  `,
})
export class CustomActionComponent {
  @Input() component: ApiEntityShowComponent | ApiEntityEditorComponent;
  @Input() action: ListActionModel = new ListActionModel();
  @Input() isLink: boolean = true;
}
