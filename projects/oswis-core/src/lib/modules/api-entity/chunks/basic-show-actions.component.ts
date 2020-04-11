import {Component} from '@angular/core';
import {AbstractActionComponent} from "./abstract-action.component";

@Component({
  selector: 'oswis-api-entity-basic-show-actions',
  template: `
    <oswis-api-entity-back-to-show-action *ngIf="!empty && isEdit()" [component]="component"></oswis-api-entity-back-to-show-action>
    <oswis-api-entity-back-to-list-show-action [component]="component"></oswis-api-entity-back-to-list-show-action>
    <oswis-api-entity-refresh-action *ngIf="!empty" [component]="component"></oswis-api-entity-refresh-action>
    <oswis-api-entity-to-edit-show-action *ngIf="!empty && !isEdit()" [component]="component"></oswis-api-entity-to-edit-show-action>
    <oswis-api-entity-delete-show-action *ngIf="!empty" [component]="component"></oswis-api-entity-delete-show-action>
    <ng-container *ngFor="let action of component.actionButtons">
      <oswis-api-entity-custom-action *ngIf="!empty" [component]="component" [action]="action" [isLink]="false"></oswis-api-entity-custom-action>
      <!-- TODO: Refactor: Empty. -->
    </ng-container>
  `,
})
export class BasicShowActionsComponent extends AbstractActionComponent {
}
