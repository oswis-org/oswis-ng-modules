import {BasicFormFields} from './basic.form-fields';
import {FormlyFieldConfig} from "@ngx-formly/core";

export class AddressFormFields {
  static street(): FormlyFieldConfig {
    return BasicFormFields.input('street', 'Ulice', '17. listopadu', false, 'wid-55');
  }

  static houseNumber(): FormlyFieldConfig {
    return BasicFormFields.numberInput('houseNumber', 'Číslo domu', '1192', false, 'wid-15', 0, 99999);
  }

  static orientationNumber(): FormlyFieldConfig {
    return BasicFormFields.numberInput('orientationNumber', 'Orientační číslo', '12', false, 'wid-20', 0, 9999);
  }

  static doorNumber(): FormlyFieldConfig {
    return BasicFormFields.numberInput('doorNumber', 'Dveře', '12', false, 'wid-10', 0, 9999);
  }

  static street2(): FormlyFieldConfig {
    return BasicFormFields.input('street2', 'Ulice - další řádek', '', false, 'wid-40');
  }

  static city(): FormlyFieldConfig {
    return BasicFormFields.input('city', 'Město', 'Olomouc', false, 'wid-40');
  }

  static postalCode(): FormlyFieldConfig {
    return BasicFormFields.input('postalCode', 'Směrovací číslo', '779 00', false, 'wid-20');
  }

  static address(): FormlyFieldConfig {
    const entityName = 'Adresa';
    return {
      templateOptions: {
        placeholder: entityName,
        btnText: entityName,
        label: entityName,
      },
      className: 'wid-95',
      wrappers: ['simple'],
      fieldGroup: [
        this.street(),
        this.houseNumber(),
        this.orientationNumber(),
        this.doorNumber(),
        this.street2(),
        this.city(),
        this.postalCode(),
      ],
    };
  }
}
