import {Component, Input} from '@angular/core';
import {ApiEntityShowComponent} from '../components/api-entity-show.component';
import {ApiEntityEditorComponent} from '../components/api-entity-editor.component';

@Component({
  selector: 'oswis-api-entity-back-to-list-show-action',
  template: `
    <button (click)="component.backToList()" mat-icon-button matTooltip="Zpět na seznam {{ component.getEntityName(12, false) }}"
            matTooltipHideDelay="300" matTooltipPosition="above" matTooltipShowDelay="200">
      <mat-icon>list</mat-icon>
    </button>
  `,
})
export class BackToListShowActionComponent {
  @Input() component: ApiEntityShowComponent | ApiEntityEditorComponent;
}
