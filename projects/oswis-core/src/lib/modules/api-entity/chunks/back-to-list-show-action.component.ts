import {Component} from '@angular/core';
import {AbstractActionComponent} from "./abstract-action.component";

@Component({
  selector: 'oswis-api-entity-back-to-list-show-action',
  template: `
    <button (click)="component.backToList()" mat-icon-button matTooltip="Zpět na seznam {{ component.getEntityName(12, false) }}"
            matTooltipHideDelay="300" matTooltipPosition="above" matTooltipShowDelay="200">
      <mat-icon>list</mat-icon>
    </button>
  `,
})
export class BackToListShowActionComponent extends AbstractActionComponent {
}
