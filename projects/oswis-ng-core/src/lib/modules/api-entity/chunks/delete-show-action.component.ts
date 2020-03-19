import {Component, Input} from '@angular/core';
import {ApiEntityShowComponent} from '../components/api-entity-show.component';
import {ApiEntityEditorComponent} from '../components/api-entity-editor.component';

@Component({
  selector: 'oswis-api-entity-delete-show-action',
  template: `
    <button (click)="component.deleteEntity(entity?.id, entity?.name)" mat-icon-button matTooltipHideDelay="300"
            matTooltip="Smazat {{ component.getEntityName(4, false) }}" matTooltipPosition="above" matTooltipShowDelay="200">
      <mat-icon>delete_forever</mat-icon>
    </button>
  `,
})
export class DeleteShowActionComponent {
  @Input() component: ApiEntityShowComponent | ApiEntityEditorComponent;
  @Input() entity: { id?: number, name?: string };
}
