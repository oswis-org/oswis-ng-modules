import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListOperationModel} from "../models/list-operation.model";

@Component({
  selector: 'oswis-api-entity-list-action-button',
  template: `
    <button (click)="clicked.emit()"
            [attr.mat-menu-item]="isMenuItem ? '' : null"
            [attr.mat-icon-button]="isMenuItem ? null : ''"
            [matTooltip]="isMenuItem ? null : operation.name">
      <mat-icon>{{ operation.icon }}</mat-icon>
      <span *ngIf="isMenuItem">{{ operation.name }}</span>
    </button>
  `,
})
export class ListActionButtons {
  @Input() operation: ListOperationModel = new ListOperationModel();
  @Input() isMenuItem: boolean = true;
  @Output() clicked: EventEmitter<void>;
}
