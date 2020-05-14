import {Component, Inject, Input} from '@angular/core';
import {DialogComponent, DialogDataInterface} from '@oswis-org/oswis-shared';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<ListFilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EntityDialogDataInterface) {
    super(dialogRef, data);
    this.setModel();
    this.setFormlyFields();
  }

  submit() {
    this.setActiveFiltersFromModel();
  }

  setModel(): void {
    this.model = {};
    this.data.activeFilters.forEach(
      (filter: KeyValue<string, string | number | boolean | null>) => {
        this.model[filter.key] = filter.value;
      }
    );
  }

  setActiveFiltersFromModel(): void {
    this.data.activeFilters = [];
    this.data.availableFilters.forEach((availableFilter: ListFilterModel) => {
      const key = availableFilter.key;
      const keyValue: KeyValue<string, string | number | boolean | null> = this.model[key] ? {key: key, value: this.model[key],} : null;
      this.data.activeFilters[key] = keyValue ?? null;
    });
  }

  setFormlyFields(): void {
    const that = this;
    this.formlyFields = [];
    this.data.availableFilters.forEach(
      (availableFilter: ListFilterModel) => {
        let field: FormlyFieldConfig = {key: availableFilter.key, defaultValue: null, templateOptions: {label: availableFilter.title}};
        that.formlyFields[availableFilter.key] = BasicFormFields.input(field);
      }
    );
  }


}
