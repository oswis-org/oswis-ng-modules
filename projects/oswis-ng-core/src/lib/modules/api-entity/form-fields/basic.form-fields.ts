import {ApiEntityService} from '../api-entity.service';
import {FormlyFieldConfig} from "@ngx-formly/core";

export class BasicFormFields {
  static id(): FormlyFieldConfig {
    return {
      key: 'id',
      type: 'input',
      hide: true,
    };
  }

  static input(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      className: className,
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      }
    };
  }

  static email(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      className: className,
      templateOptions: {
        type: 'email',
        label: label,
        placeholder: placeholder,
        required: required,
      }
    };
  }

  static numberInput(
    key: string,
    label: string,
    placeholder: string,
    required: boolean = false,
    className: string = null,
    min: number = -999999,
    max: number = 999999,
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      className: className,
      templateOptions: {
        label: label,
        placeholder: placeholder,
        type: 'number',
        required: required,
        min: min,
        max: max,
      }
    };
  }

  static textAreaInput(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
    return {
      key: key,
      type: 'textarea',
      className: className,
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      }
    };
  }

  static dateTimeInput(type: string, key: string, label: string, required: boolean = false, className: string = null): FormlyFieldConfig {
    return {
      key: key,
      type: 'datepicker-with-type',
      className: className,
      templateOptions: {
        type: type,
        placeholder: label,
        readonly: true,
        required: required,
        datepickerOptions: {
          readonly: true,
          touchUi: true,
        }
      }
    };
  }

  static simpleTypeaheadWrapper(
    key: string,
    apiEntityService: ApiEntityService,
    subKey: string = 'id',
    required: boolean = false,
    entityName: string = null,
    className: string = 'wid-100-small'
  ): FormlyFieldConfig {
    entityName = entityName || apiEntityService.getEntityName(1, true);
    return {
      key: key,
      templateOptions: {
        placeholder: entityName,
        btnText: entityName,
        label: entityName,
      },
      className: className,
      wrappers: ['simple'],
      fieldGroup: [
        {
          key: subKey,
          type: 'typeahead',
          templateOptions: {
            required: required,
            placeholder: entityName,
            search$: (term, id: number = -1) => {
              if (id < 0) {
                return apiEntityService.get(1, 5, [], [{column: 'search', value: term}]);
              }
              return apiEntityService.getById(id);
            },
          },
        },
      ],
    };
  }

  static singleRepeatTypeaheadWrapper(
    key: string,
    subKey: string,
    apiEntityService: ApiEntityService,
    subSubKey: string = 'id',
    nameColumnName: string = 'name',
    className: string = 'wid-90-small',
  ): FormlyFieldConfig {
    const entityName = apiEntityService.getEntityName(1, true);
    const entitiesName = apiEntityService.getEntityName(11, true);
    return {
      key: subKey,
      type: 'repeat',
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          label: entitiesName,
          placeholder: entitiesName,
          btnText: entitiesName,
        },
        fieldGroup: [
          {
            key: subKey,
            templateOptions: {
              placeholder: entityName,
              btnText: entityName,
              label: entityName,
            },
            className: className,
            wrappers: ['simple'],
            fieldGroup: [{
              key: subSubKey,
              type: 'typeahead',
              templateOptions: {
                placeholder: entityName,
                search$: (term, id: number = -1) => {
                  if (id < 0) {
                    return apiEntityService.get(1, 5, [], [{column: nameColumnName, value: term}]);
                  }
                  return apiEntityService.getById(id);
                },
              },
            }],
          },
        ],
      },
    };
  }

  static checkbox(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
    return {
      key: key,
      type: 'checkbox',
      className: className,
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
        readonly: true,
        indeterminate: false,
      }
    };
  }

  static repeat(
    key: string,
    label: string,
    fieldGroup: object[],
    className: string = 'flex-wrap',
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'repeat',
      className: className,
      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          label: label,
          placeholder: label,
          btnText: label,
        },
        fieldGroup: fieldGroup,
      },
    };
  }

  static singleWrapper(
    key: string,
    label: string,
    fieldGroup: object[],
    className: string = 'wid-90',
  ): FormlyFieldConfig {
    return {
      key: key,
      wrappers: ['simple'],
      className: className,
      templateOptions: {label: label},
      fieldGroup: fieldGroup,
    };
  }
}
