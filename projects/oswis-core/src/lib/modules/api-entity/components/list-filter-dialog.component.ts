import {Component, Inject, Input} from '@angular/core';
import {DialogComponent, DialogDataInterface} from '@oswis-org/oswis-shared';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ListFilterModel} from "../models/list-filter.model";
import {KeyValue} from "@angular/common";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";
import {BasicFormFields} from "../form-fields/basic.form-fields";

interface EntityDialogDataInterface extends DialogDataInterface {
  availableFilters: ListFilterModel[],
  activeFilters: KeyValue<string, string | number | boolean | null>[],
}

@Component({
  selector: 'oswis-list-filter-dialog',
  templateUrl: './list-filter-dialog.component.html',
})
export class ListFilterDialogComponent extends DialogComponent {
  @Input() public model: object = {};
  @Input() public formlyFields: FormlyFieldConfig[];
  public form: FormGroup = new FormGroup({});
  @Input() public formHelp = null;

  constructor(public dialogRef: MatDialogRef<ListFilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MatDialogConfig<EntityDialogDataInterface>) {
    super(dialogRef, data);
    this.setModel();
    this.setFormlyFields();
  }

  submit() {
    this.setActiveFiltersFromModel();
  }

  setModel(): void {
    const that = this;
    this.model = {};
    this.data.data.activeFilters.forEach(
      (filter: KeyValue<string, string | number | boolean | null>) => {
        that.model[filter.key] = filter.value;
      }
    );
  }

  setActiveFiltersFromModel(): void {
    const that = this;
    this.data.data.activeFilters = [];
    this.data.data.availableFilters.forEach((availableFilter: ListFilterModel) => {
      const key = availableFilter.key;
      const keyValue: KeyValue<string, string | number | boolean | null> = that.model[key] ? {key: key, value: that.model[key],} : null;
      that.data.data.activeFilters[key] = keyValue ?? null;
    });
  }

  setFormlyFields(): void {
    const that = this;
    this.formlyFields = [];
    this.data.data.availableFilters.forEach(
      (availableFilter: ListFilterModel) => {
        let field: FormlyFieldConfig = {key: availableFilter.key, defaultValue: null, templateOptions: {label: availableFilter.title}};
        that.formlyFields[availableFilter.key] = BasicFormFields.input(field);
      }
    );
  }


}
