import {Component} from '@angular/core';
import {AbstractActionComponent} from "./abstract-action.component";

@Component({
  selector: 'oswis-api-entity-to-edit-show-action',
  template: `
    <button (click)="component.edit()" mat-icon-button matTooltip="Upravit kontakt" matTooltipPosition="above">
      <mat-icon>mode_edit</mat-icon>
    </button>
  `,
})
export class EditShowActionComponent extends AbstractActionComponent {
}
