import {Component, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {MatInput} from '@angular/material/input';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oswis-formly-datepicker-with-type',
  template: `
    <mat-form-field>
      <input matInput
             [formControl]="formControl"
             [matDatepicker]="picker"
             [max]="to.max"
             [min]="to.min"
             [type]="to.type"
             [readonly]="to.readonly"
             [placeholder]="to.placeholder">
      <mat-datepicker-toggle #matSuffix matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker [touchUi]="true">
      </mat-datepicker>
    </mat-form-field>
  `,
})
export class MatDatepickerWithTypeComponent extends FieldType {
  @ViewChild(MatInput, {read: true, static: true}) formFieldControl: MatInput;

}
