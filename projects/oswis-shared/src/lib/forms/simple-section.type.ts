import {Component} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';

@Component({
  selector: 'oswis-formly-simple-section',
  template: `
    <div class="form-section">
      <div class="flex-row">
        <div>
          <h2>
            <small>
              {{ field.fieldArray.templateOptions.label || field.fieldArray.templateOptions.placeholder }}
            </small>
          </h2>
        </div>
      </div>
      <div *ngFor="let field of field.fieldGroup">
        <formly-group [options]="options" class="flex-row-formly-inside">
        </formly-group>
      </div>
    </div>
  `,
})
export class SimpleSectionTypeComponent extends FieldArrayType {
}
