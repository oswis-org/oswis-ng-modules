import {Component} from '@angular/core';
import {AbstractActionComponent} from "./abstract-action.component";

@Component({
  selector: 'oswis-api-entity-refresh-action',
  template: `
    <button (click)="component.refresh()" mat-icon-button matTooltipHideDelay="300" matTooltipPosition="above"
            matTooltip="Znovu načíst {{ component.getEntityName(4, false) }}" matTooltipShowDelay="200">
      <mat-icon>cached</mat-icon>
    </button>
  `,
})
export class RefreshActionComponent extends AbstractActionComponent {
}
