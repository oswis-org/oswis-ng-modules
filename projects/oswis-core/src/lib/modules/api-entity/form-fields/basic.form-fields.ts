import {ApiEntityService} from '../services/api-entity.service';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {Observable} from "rxjs";
import {BasicModel} from "@oswis-org/oswis-shared";
import {JsonLdListResponse} from "../models/json-ld-list.response";

// @dynamic
export class BasicFormFields {
  static id(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'id' : config.key;
    config.hide = undefined === config.hide ? true : config.hide;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Unikátní identifikátor' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Unikátní číselný identifikátor položky. Je generován automaticky.' : config.templateOptions.description;
    config.templateOptions.min = undefined === config.templateOptions.min ? 1 : config.templateOptions.min;
    config.templateOptions.step = undefined === config.templateOptions.step ? 1 : config.templateOptions.step;

    return this.number(config);
  }

  static input(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.type = undefined === config.type ? 'input' : config.type;

    return config;
  }

  static email(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'email' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.type = undefined === config.templateOptions.type ? 'email' : config.templateOptions.type;
    config.templateOptions.label = undefined === config.templateOptions.type ? 'E-mail' : config.templateOptions.type;
    config.templateOptions.description = undefined === config.templateOptions.type ? 'Adresa e-mailové schránky.' : config.templateOptions.type;
    config.templateOptions.placeholder = undefined === config.templateOptions.type ? 'john.doe@example.com' : config.templateOptions.type;

    return this.input(config);
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

  // noinspection JSUnusedGlobalSymbols
  static checkBox(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.type = undefined === config.type ? 'checkbox' : config.type;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.readonly = undefined === config.templateOptions.readonly ? true : config.templateOptions.readonly;
    config.templateOptions.indeterminate = undefined === config.templateOptions.readonly ? false : config.templateOptions.indeterminate;

    return this.input(config);
  }

  static number(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.type = undefined === config.templateOptions.type ? 'number' : config.templateOptions.type;

    return this.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static textArea(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'textValue' : config.key;
    config.type = undefined === config.type ? 'textarea' : config.type;

    return this.input(config);
  }

  static dateTime(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'dateTime' : config.key;
    config.type = undefined === config.type ? 'datepicker-with-type' : config.type;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.type = undefined === config.templateOptions.type ? 'datetime-local' : config.templateOptions.type;
    config.templateOptions.readonly = undefined === config.templateOptions.readonly ? true : config.templateOptions.readonly;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Datum a čas' : config.templateOptions.label;
    config.templateOptions.datepickerOptions = undefined === config.templateOptions.datepickerOptions ? {} : config.templateOptions.datepickerOptions;
    config.templateOptions.datepickerOptions.readonly = undefined === config.templateOptions.datepickerOptions.readonly ? true : config.templateOptions.datepickerOptions.readonly;
    config.templateOptions.datepickerOptions.touchUi = undefined === config.templateOptions.datepickerOptions.touchUi ? true : config.templateOptions.datepickerOptions.touchUi;

    return config;
  }

  static date(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'date' : config.key;
    config.type = undefined === config.type ? 'date' : config.type;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.type = undefined === config.templateOptions.type ? 'date' : config.templateOptions.type;
    config.templateOptions.readonly = undefined === config.templateOptions.readonly ? true : config.templateOptions.readonly;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Datum' : config.templateOptions.label;

    return config;
  }

  static repeat(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.type = undefined === config.type ? 'repeat' : config.type;
    config.className = undefined === config.className ? 'flex-wrap' : config.className;
    config.fieldArray = undefined === config.fieldArray ? {} : config.fieldArray;
    config.fieldArray.fieldGroupClassName = undefined === config.fieldArray.fieldGroupClassName ? 'row' : config.fieldArray.fieldGroupClassName;
    config.fieldArray.templateOptions = undefined === config.fieldArray.templateOptions ? {} : config.fieldArray.templateOptions;
    config.fieldArray.templateOptions.btnText = undefined === config.fieldArray.templateOptions.btnText ? config.fieldArray.templateOptions.label : config.fieldArray.templateOptions.btnText;
    config.fieldArray.fieldGroup = undefined === config.fieldArray.fieldGroup ? [] : config.fieldArray.fieldGroup;

    return this.input(config);
  }

  static simpleWrapper(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.wrappers = undefined === config.wrappers ? ['simple'] : config.wrappers;
    config.className = undefined === config.className ? 'wid-90' : config.className;
    config.fieldGroup = undefined === config.fieldGroup ? [] : config.fieldGroup;

    return this.input(config);
  }

  static simpleTypeaheadWrapper(config: FormlyFieldConfig = {}, service: ApiEntityService): FormlyFieldConfig {
    config.className = undefined === config.className ? 'wid-100-small wid-100 wid-small' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? service.getEntityName(1, true) : config.templateOptions.label;
    config.templateOptions.btnText = undefined === config.templateOptions.btnText ? config.templateOptions.label : config.templateOptions.btnText;
    config.fieldGroup = undefined === config.fieldGroup ? [] : config.fieldGroup;
    config.fieldGroup[0] = undefined === config.fieldGroup[0] ? {} : config.fieldGroup[0];
    config.fieldGroup[0].key = undefined === config.fieldGroup[0].key ? 'id' : config.fieldGroup[0].key;
    config.fieldGroup[0].type = undefined === config.fieldGroup[0].type ? 'typeahead' : config.fieldGroup[0].type;
    config.fieldGroup[0].templateOptions = undefined === config.fieldGroup[0].templateOptions ? {} : config.fieldGroup[0].templateOptions;
    config.fieldGroup[0].templateOptions.label = undefined === config.fieldGroup[0].templateOptions.label ? config.templateOptions.label : config.fieldGroup[0].templateOptions.label;
    config.fieldGroup[0].templateOptions.placeholder = undefined === config.fieldGroup[0].templateOptions.placeholder ? config.fieldGroup[0].templateOptions.label : config.fieldGroup[0].templateOptions.placeholder;
    config.fieldGroup[0].templateOptions.search$ = undefined === config.fieldGroup[0].templateOptions.search$ ? this.getSearchFunction(service) : config.fieldGroup[0].templateOptions.search$;

    return this.simpleWrapper(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static oldOldSimpleTypeaheadWrapper(
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
      templateOptions: {
        placeholder: entityName,
        btnText: entityName,
        label: entityName,
      },
    };
  }

  // noinspection JSUnusedGlobalSymbols
  static simpleRepeatTypeaheadWrapper(config: FormlyFieldConfig = {}, service: ApiEntityService): FormlyFieldConfig {
    const entitiesName = service.getEntityName(11, true);
    config.fieldArray = undefined === config.fieldArray ? {} : config.fieldArray;
    config.fieldArray.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.fieldArray.templateOptions.label = undefined === config.fieldArray.templateOptions.label ? entitiesName : config.fieldArray.templateOptions.label;
    config.fieldArray.fieldGroup[0] = undefined === config.fieldArray.fieldGroup[0] ? {} : config.fieldArray.fieldGroup[0];
    config.fieldArray.fieldGroup[0].className = undefined === config.fieldArray.fieldGroup[0].className ? 'wid-90-small' : config.fieldArray.fieldGroup[0].className;
    config.fieldArray.fieldGroup[0] = this.simpleTypeaheadWrapper(config.fieldArray.fieldGroup[0], service);

    return this.repeat(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static oldOldSingleRepeatTypeaheadWrapper(
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
        templateOptions: {label: entitiesName, placeholder: entitiesName, btnText: entitiesName,},
        fieldGroup: [
          {
            key: subKey,
            className: className,
            wrappers: ['simple'],
            templateOptions: {
              placeholder: entityName,
              btnText: entityName,
              label: entityName,
            },
            fieldGroup: [{
              key: subSubKey ?? 'id',
              type: 'typeahead',
              templateOptions: {
                placeholder: entityName,
                search$: (term, id: number = -1) => {
                  if (id < 0) {
                    return apiEntityService.get(1, 5, [], [{column: nameColumnName ?? 'name', value: term}]);
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

  // noinspection JSUnusedGlobalSymbols
  static oldOldDateTimeInput(type: string, key: string, label: string, required: boolean = false, className: string = null): FormlyFieldConfig {
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

  static oldOldInput(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
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

  // noinspection JSUnusedGlobalSymbols
  static oldOldEmail(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
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

  // noinspection JSUnusedGlobalSymbols
  static oldOldNumberInput(
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

  // noinspection JSUnusedGlobalSymbols
  static oldOldTextArea(key: string, label: string, placeholder: string, required: boolean = false, className: string = null): FormlyFieldConfig {
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

  // noinspection JSUnusedGlobalSymbols
  static oldSimpleWrapper(
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

  // noinspection JSUnusedGlobalSymbols
  static oldOldRepeat(
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

  protected static getSearchFunction(service: ApiEntityService, searchColumn: string = 'search'): (term?: string, id?: number) => Observable<BasicModel | JsonLdListResponse<BasicModel>> {
    return function (term: string = null, id: number = -1): Observable<BasicModel | JsonLdListResponse<BasicModel>> {
      return (id < 0) ? service.get(1, 5, [], [{column: searchColumn, value: term}]) : service.getById(id);
    };
  }

}
