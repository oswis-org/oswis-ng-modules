import {ListActionModel} from "../models/list-action.model";
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'oswis-api-entity-list-action-button',
  template: `
    <!-- Button in submenu. -->
    <button mat-menu-item *ngIf="isMenuItem" (click)="clicked.emit()" [matBadgeHidden]="!getBadge()" matBadge="{{ getBadge() }}" matBadgeColor="warn">
      <mat-icon>{{ action.icon }}</mat-icon>
      <span *ngIf="isMenuItem">{{ action.name }}</span>
    </button>
    <!-- Button in main menu. -->
    <button *ngIf="!isMenuItem" (click)="clicked.emit()" mat-icon-button [matTooltip]="action.name"
            [matBadgeHidden]="!getBadge()" matBadge="{{ getBadge() }}" matBadgeColor="warn">
      <mat-icon>{{ action.icon }}</mat-icon>
    </button>
  `,
})
export class CustomListActionButton {
  @Input() action: ListActionModel = new ListActionModel();
  @Input() isMenuItem: boolean = true;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  getBadge(): string {
    return this.action.badge ? this.action.badge() : null;
  }
}
