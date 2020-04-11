import {Component} from '@angular/core';
import {AbstractActionComponent} from "./abstract-action.component";

@Component({
  selector: 'oswis-api-entity-back-to-show-action',
  template: `
    <button (click)="component.backToShow()" mat-icon-button matTooltip="Zpět na zobrazení {{ component.getEntityName(2, false) }}"
            matTooltipHideDelay="300" matTooltipPosition="above" matTooltipShowDelay="200">
      <mat-icon>undo</mat-icon>
    </button>
  `,
})
export class BackToShowActionComponent extends AbstractActionComponent {
}
