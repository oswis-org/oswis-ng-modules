import {BasicFormFields} from './basic.form-fields';
import {FormlyFieldConfig} from "@ngx-formly/core";

export class NameableFormFields {
  static simpleName(className?: string): FormlyFieldConfig {
    return BasicFormFields.input('name', 'Název', 'Název položky', true, className);
  }

  static shortName(): FormlyFieldConfig {
    return BasicFormFields.input('shortName', 'Zkrácený název', 'Zkratka', true);
  }

  static slug(): FormlyFieldConfig {
    return BasicFormFields.input('slug', 'URL řetězec (bez diakritiky a mezer)', 'zkratka', true);
  }

  static description(): FormlyFieldConfig {
    return BasicFormFields.input('description', 'Popis', 'Popis položky.', false);
  }

  static note(className?: string): FormlyFieldConfig {
    return BasicFormFields.textAreaInput('note', 'Poznámka', 'Nějaké další informace...', false, className);
  }

  static internalNote(): FormlyFieldConfig {
    return BasicFormFields.textAreaInput('internalNote', 'Interní poznámka', 'Nějaké interní informace...', false);
  }

  static username(): FormlyFieldConfig {
    return BasicFormFields.input('username', 'Uživatelské jméno', 'josef.novak', true);
  }

  static dateTime(type: string = 'date', className: string = null): FormlyFieldConfig {
    return BasicFormFields.dateTimeInput(type, 'dateTime', 'Datum', true, className);
  }

  static birthDate(required: boolean = false, className: string = null): FormlyFieldConfig {
    return BasicFormFields.dateTimeInput('date', 'birthDate', 'Datum narození', required, className);
  }

  static email(): FormlyFieldConfig {
    return BasicFormFields.email('email', 'E-mail', 'josef.novak@example.com', true);
  }

  static fullName(className: string = null): FormlyFieldConfig {
    return BasicFormFields.input('fullName', 'Celé jméno', 'Ing. Josef Novák', false, className);
  }

  static idNameDescription(shortName: boolean = false, slug: boolean = false): FormlyFieldConfig {
    const entityName = null;
    const fields = [BasicFormFields.id(), this.simpleName()];
    if (shortName) {
      fields.push(this.shortName());
    }
    if (slug) {
      fields.push(this.slug());
    }
    fields.push(this.description());
    return {
      templateOptions: {
        placeholder: entityName,
        btnText: entityName,
        label: entityName,
      },
      className: 'wid-100',
      wrappers: ['simple'],
      fieldGroup: fields,
    };
  }
}
