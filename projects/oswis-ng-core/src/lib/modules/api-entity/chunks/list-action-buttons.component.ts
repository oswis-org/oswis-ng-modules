import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListActionModel} from "../models/list-action.model";

@Component({
  selector: 'oswis-api-entity-list-action-button',
  template: `
    <!-- Button in submenu. -->
    <button mat-menu-item *ngIf="isMenuItem" (click)="clicked.emit()">
      <mat-icon>{{ action.icon }}</mat-icon>
      <span *ngIf="isMenuItem">{{ action.name }}</span>
    </button>
    <!-- Button in main menu. -->
    <button *ngIf="!isMenuItem" (click)="clicked.emit()" mat-icon-button [matTooltip]="action.name">
      <mat-icon>{{ action.icon }}</mat-icon>
    </button>
  `,
})
export class ListActionButtons {
  @Input() action: ListActionModel = new ListActionModel();
  @Input() isMenuItem: boolean = true;
  @Output() clicked: EventEmitter<void>;
}
