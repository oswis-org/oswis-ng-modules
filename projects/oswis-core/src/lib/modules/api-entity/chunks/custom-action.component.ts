import {Component, Input} from '@angular/core';
import {ListActionModel} from "../models/list-action.model";
import {AbstractActionComponent} from "./abstract-action.component";

@Component({
  selector: 'oswis-api-entity-custom-action',
  template: `
    <button (click)="component.getAction(action)" mat-icon-button [matTooltip]="action.name">
      <mat-icon *ngIf="action.icon">{{action.icon}}</mat-icon>
      <span *ngIf="isLink">{{ action.name }}</span>
    </button>
  `,
})
export class CustomActionComponent extends AbstractActionComponent {
  @Input() action: ListActionModel = new ListActionModel();
  @Input() isLink: boolean = true;
}
