import {Component, Input} from '@angular/core';
import {AbstractActionComponent} from "./abstract-action.component";
import {ApiEntitySingleAbstractComponent} from "../components/api-entity-single.abstract.component";

@Component({
  selector: 'oswis-api-entity-delete-show-action',
  template: `
    <button (click)="component.deleteEntity(entity?.id, entity?.name)" mat-icon-button matTooltipHideDelay="300"
            matTooltip="Smazat {{ component.getEntityName(4, false) }}" matTooltipPosition="above" matTooltipShowDelay="200">
      <mat-icon>delete_forever</mat-icon>
    </button>
  `,
})
export class DeleteShowActionComponent extends AbstractActionComponent {
  @Input() component: ApiEntitySingleAbstractComponent;
  @Input() entity: { id?: number, name?: string };
}
