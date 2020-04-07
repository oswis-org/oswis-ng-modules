import {Component, Input} from '@angular/core';
import {ApiEntityComponent} from '../components/api-entity.component';

@Component({
  selector: 'oswis-api-entity-new-entity-button',
  template: `
    <div style="z-index:5; position: fixed; bottom: 1em; right: 1em;">
      <button [routerLink]="apiEntityComponent.newItemRoute()" mat-mini-fab>
        <mat-icon class="mat-18">add</mat-icon>
      </button>
    </div>
  `,
})
export class NewEntityButtonComponent {
  @Input() apiEntityComponent: ApiEntityComponent;
}
