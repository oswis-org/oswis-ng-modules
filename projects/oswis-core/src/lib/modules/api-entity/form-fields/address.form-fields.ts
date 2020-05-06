import {BasicFormFields} from './basic.form-fields';
import {FormlyFieldConfig} from "@ngx-formly/core";

// noinspection JSUnusedGlobalSymbols
export class AddressFormFields {
  static street(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'street' : config.key;
    config.className = undefined === config.className ? 'wid-55' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Název ulice' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? '17. listopadu' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  static houseNumber(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'houseNumber' : config.key;
    config.className = undefined === config.className ? 'wid-15' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Číslo domu' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? '1192' : config.templateOptions.placeholder;
    config.templateOptions.min = undefined === config.templateOptions.min ? 0 : config.templateOptions.min;

    return BasicFormFields.input(config);
  }

  static orientationNumber(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'orientationNumber' : config.key;
    config.className = undefined === config.className ? 'wid-20' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Číslo orientační' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? '12' : config.templateOptions.placeholder;
    config.templateOptions.min = undefined === config.templateOptions.min ? 0 : config.templateOptions.min;

    return BasicFormFields.input(config);
  }

  static doorNumber(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'doorNumber' : config.key;
    config.className = undefined === config.className ? 'wid-10' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Číslo dveří' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? '3' : config.templateOptions.placeholder;
    config.templateOptions.min = undefined === config.templateOptions.min ? 0 : config.templateOptions.min;

    return BasicFormFields.input(config);
  }

  static street2(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'street2' : config.key;
    config.className = undefined === config.className ? 'wid-40' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Ulice - doplnění' : config.templateOptions.label;

    return BasicFormFields.input(config);
  }

  static city(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'city' : config.key;
    config.className = undefined === config.className ? 'wid-40' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Město' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Olomouc' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  static postalCode(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'postalCode' : config.key;
    config.className = undefined === config.className ? 'wid-20' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Směrovací číslo' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? '779 00' : config.templateOptions.placeholder;
    config.templateOptions.minLength = undefined === config.templateOptions.minLength ? 6 : config.templateOptions.minLength;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static address(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.className = undefined === config.className ? 'wid-95' : config.className;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Adresa' : config.templateOptions.label;
    config.templateOptions.btnText = undefined === config.templateOptions.btnText ? config.templateOptions.label : config.templateOptions.btnText;
    config.fieldGroup = [
      this.street(),
      this.houseNumber(),
      this.orientationNumber(),
      this.doorNumber(),
      this.street2(),
      this.city(),
      this.postalCode(),
    ];

    return BasicFormFields.simpleWrapper(config);
  }
}
