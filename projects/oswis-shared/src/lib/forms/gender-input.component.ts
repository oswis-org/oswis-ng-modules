import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oswis-gender-input',
  template: `
    <div>
      <!--suppress AngularInvalidExpressionResultType -->
      <mat-radio-group [formControl]="formControl">
        <strong>Pohlaví: </strong>
        <mat-radio-button value="" matTooltip="Neuvedeno" matTooltipPosition="right" matTooltipShowDelay="200" matTooltipHideDelay="300">
          ∅
        </mat-radio-button>
        <mat-radio-button value="m" matTooltip="Muž" matTooltipPosition="right" matTooltipShowDelay="200" matTooltipHideDelay="300"
                          class="selected-blue">
          👨
        </mat-radio-button>
        <mat-radio-button value="f" matTooltip="Žena" matTooltipPosition="right" matTooltipShowDelay="200" matTooltipHideDelay="300"
                          class="selected-red">
          👩
        </mat-radio-button>
      </mat-radio-group>
    </div>
  `,
})
export class GenderInputComponent extends FieldType {

}
