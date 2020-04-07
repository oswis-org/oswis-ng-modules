import {Component} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oswis-formly-repeat-section',
  template: `
    <div class="form-section">
      <div class="flex-row">
        <div><h2>{{ field.fieldArray.templateOptions.label || field.fieldArray.templateOptions.placeholder }}</h2></div>
        <div>
          <button mat-icon-button color="primary" (click)="add()" type="button">
            <mat-icon class="mat-18">add</mat-icon>
          </button>
        </div>
      </div>
      <div *ngFor="let field of field.fieldGroup; let i = index;">
        <formly-group [field]="field" class="flex-row-formly-inside">
          <div style="display:inline-block;box-sizing:border-box;width: 5%;">
            <button mat-icon-button color="warn" (click)="remove(i)" matTooltip="Smazat"
                    matTooltipHideDelay="300" matTooltipPosition="before" matTooltipShowDelay="150">
              <mat-icon class="mat-18">close</mat-icon>
            </button>
          </div>
        </formly-group>
      </div>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
}
