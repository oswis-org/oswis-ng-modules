import {Component, Input} from '@angular/core';
import {ApiEntityShowComponent} from '../components/api-entity-show.component';

@Component({
  selector: 'oswis-api-entity-edit-show-action',
  template: `
    <button (click)="show.edit()" mat-icon-button matTooltip="Upravit kontakt" matTooltipHideDelay="300"
            matTooltipPosition="above" matTooltipShowDelay="200">
      <mat-icon>mode_edit</mat-icon>
    </button>
  `,
})
export class EditShowActionComponent {
  @Input() show: ApiEntityShowComponent;
}
