import {Component, Inject, OnInit} from '@angular/core';
import {DialogComponent, DialogDataInterface} from '@oswis-org/oswis-shared';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListFilterModel} from "../models/list-filter.model";
import {KeyValue} from "@angular/common";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";
import {BasicFormFields} from "../form-fields/basic.form-fields";
import {ApiEntityListTypeEnum} from "../enums/api-entity-list-type.enum";
import {NameableFormFields} from "../form-fields/nameable.form-fields";

interface EntityDialogDataInterface extends DialogDataInterface {
  availableFilters: ListFilterModel[],
  activeFilters: KeyValue<string, string | number | boolean | null>[],
}

@Component({
  selector: 'oswis-list-filter-dialog',
  templateUrl: './list-filter-dialog.component.html',
})
export class ListFilterDialogComponent extends DialogComponent implements OnInit {
  public model: object = {};
  public formlyFields: FormlyFieldConfig[] = [];
  public formlyFieldsNamed: FormlyFieldConfig[] = [];
  public form: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<ListFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityDialogDataInterface,
  ) {
    super(dialogRef, data);
  }

  ngOnInit() {
    this.setModel();
    this.setFormlyFields();
    console.log(this);
  }

  submit() {
    this.setActiveFiltersFromModel();
    this.dialogRef.close();
  }

  setModel(): void {
    this.model = {};
    // console.log('setModel: this.data: ', this.data);
    for (let index in this.data.activeFilters) {
      const escapedIndex = index.replace(/\[/g, '&#91;').replace(/]/g, '&#93;')
      if (this.data.activeFilters[index]) {
        this.model[escapedIndex] = this.data.activeFilters[index].value;
      } else {
        delete this.model[escapedIndex];
      }
    }
    // this.form.patchValue(this.model);
    // console.log('setModel: this.model: ', this.model);
  }

  clearArray(array) {
    for (let index in array) {
      // noinspection JSUnfilteredForInLoop
      delete array[index];
    }
  }

  setActiveFiltersFromModel(): void {
    this.clearArray(this.data.activeFilters);
    for (let index in this.data.availableFilters) {
      const escapedIndex = index.replace(/\[/g, '&#91;').replace(/]/g, '&#93;');
      if (this.model[escapedIndex]) {
        this.data.activeFilters[index] = this.model[escapedIndex] ? {key: index, value: this.model[escapedIndex]} : null;
      } else {
        delete this.data.activeFilters[index];
      }
    }
    console.log("Active filters: ", this.data.activeFilters);
  }

  setFormlyFields(): void {
    this.formlyFieldsNamed = [];
    this.formlyFields = [];
    // console.log("Set formlyFields from availableFilters: ", this.data.availableFilters);
    for (let key in this.data.availableFilters) {
      const availableFilter = this.data.availableFilters[key];
      this.formlyFieldsNamed[availableFilter.key] = this.getFormlyField(availableFilter);
    }
    for (let key in this.formlyFieldsNamed) {
      this.formlyFields.push(this.formlyFieldsNamed[key]);
    }
    // console.log('Formly fields: ', this.formlyFieldsValues);
  }

  getFormlyField(filter: ListFilterModel): FormlyFieldConfig {
    const config: FormlyFieldConfig = {
      key: filter.key.replace(/\[/g, '&#91;').replace(/]/g, '&#93;'),
      templateOptions: {label: filter.title},
      defaultValue: null,
    };

    if ('number' == filter.inputType || ApiEntityListTypeEnum.NUMBER == filter.columnType) {
      return BasicFormFields.number(config);
    }

    if ('datetime' == filter.inputType || ApiEntityListTypeEnum.DATETIME == filter.columnType) {
      return BasicFormFields.dateTime(config);
    }

    if ('checkbox' == filter.inputType || ApiEntityListTypeEnum.BOOLEAN == filter.columnType) {
      return BasicFormFields.checkBox(config);
    }

    if ('datetime-range' == filter.inputType || ApiEntityListTypeEnum.DATETIME_RANGE == filter.columnType) {
      return NameableFormFields.dateTimeRange(config);
    }

    if ('percent' == filter.inputType || ApiEntityListTypeEnum.PERCENT == filter.columnType) {
      config.templateOptions.min = 0;
      config.templateOptions.min = 100;
      config.templateOptions.step = 1;
      return BasicFormFields.number(config);
    }

    if (filter.service) {
      return BasicFormFields.simpleTypeaheadWrapper(config, filter.service);
    }

    return BasicFormFields.input(config);
  }
}
