import {BasicFormFields} from './basic.form-fields';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {ImageAbstractService} from "../services/image.abstract.service";

// noinspection JSUnusedGlobalSymbols
export class NameableFormFields {
  static oldOldSimpleName(className?: string): FormlyFieldConfig {
    return BasicFormFields.oldOldInput('name', 'Název', 'Název položky', true, className);
  }

  // noinspection JSUnusedGlobalSymbols
  static simpleName(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'name' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Celý název' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Celé jméno nebo název položky.' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Josef Novák' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static shortName(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'shortName' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Zkrácený název' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Zkrácené jméno nebo název položky.' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Josef' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static slug(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    const description = 'Jedinečný textový identifikátor do URL (adresy). Může se skládat pouze z malých a velkých písmen, číslic a pomlček. ' +
      'Pokud není vyplněn, generuje se z názvu/jména. Po uložení by se již neměl měnit, pokud je to možné';
    config.key = undefined === config.key ? 'forcedSlug' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'URL řetězec („slug“)' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? description : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'josef-novak' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static description(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'description' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Popis' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Krátký textový popis (o délce maximálně jednotek řádků).' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Josef Novák je uživatel systému.' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static note(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'note' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Poznámka' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Textová poznámka.' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Josef Novák je uživatel systému.' : config.templateOptions.placeholder;

    return BasicFormFields.textArea(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static internalNote(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'internalNote' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Interní poznámka' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Interní (neveřejná) textová poznámka.' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Josef Novák je uživatel systému a je to tajné.' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static username(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'username' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Uživatelské jméno' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Uživatelské jméno by nemělo obsahovat mezery, diakritiku a speciální znaky.' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'josef.novak' : config.templateOptions.placeholder;
    config.templateOptions.required = undefined === config.templateOptions.required ? true : config.templateOptions.required;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static dateTime(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    return BasicFormFields.dateTime(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static date(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    return BasicFormFields.date(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static startDateTime(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'startDateTime' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Datum začátku' : config.templateOptions.label;

    return BasicFormFields.dateTime(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static endDateTime(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'endDateTime' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Datum konce' : config.templateOptions.label;

    return BasicFormFields.dateTime(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static birthDateTime(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'birthDateTime' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Datum narození' : config.templateOptions.label;

    return BasicFormFields.dateTime(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static email(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    return BasicFormFields.email(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static fullName(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.key = undefined === config.key ? 'fullName' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Celé jméno' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? 'Celé jméno nebo název položky.' : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? 'Mgr. Josef Novák, PhD.' : config.templateOptions.placeholder;

    return BasicFormFields.input(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static priority(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    const description = 'Priorita je celé číslo sloužící pro ovlivnění důležitosti položky (např. při řazení). ' +
      'Vyšší (kladné) číslo znamená vyšší prioritu, nižší (záporné) číslo nižší prioritu.';
    config.key = undefined === config.key ? 'priority' : config.key;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Priorita' : config.templateOptions.label;
    config.templateOptions.description = undefined === config.templateOptions.description ? description : config.templateOptions.description;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? '0' : config.templateOptions.placeholder;
    config.templateOptions.min = undefined === config.templateOptions.min ? -999999 : config.templateOptions.min;
    config.templateOptions.max = undefined === config.templateOptions.max ? 999999 : config.templateOptions.max;

    return BasicFormFields.number(config);
  }

  public static imageCropper(config: FormlyFieldConfig = {}, imageService: ImageAbstractService): FormlyFieldConfig {
    config.key = undefined === config.key ? 'image' : config.key;
    config.type = undefined === config.type ? 'image-cropper' : config.type;
    config.templateOptions = undefined === config.templateOptions ? {} : config.templateOptions;
    config.templateOptions.label = undefined === config.templateOptions.label ? 'Obrázek' : config.templateOptions.label;
    config.templateOptions.placeholder = undefined === config.templateOptions.placeholder ? config.templateOptions.label : config.templateOptions.placeholder;
    config.templateOptions.fileName = undefined === config.templateOptions.fileName ? 'oswis-uploaded-image' : config.templateOptions.fileName;
    config.templateOptions.croppedWidth = undefined === config.templateOptions.croppedWidth ? 100 : config.templateOptions.croppedWidth;
    config.templateOptions.croppedHeight = undefined === config.templateOptions.croppedHeight ? 100 : config.templateOptions.croppedHeight;
    config.templateOptions.keepAscpect = undefined === config.templateOptions.keepAspect ? true : config.templateOptions.keepAscpect;
    config.templateOptions.upload$ = undefined === config.templateOptions.upload$ ? (formData: FormData) => imageService.postImage(formData) : config.templateOptions.upload$;

    return BasicFormFields.input(config);
  }


  // noinspection JSUnusedGlobalSymbols
  static idNameDescription(shortName: boolean = true, slug: boolean = true, config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.className = undefined === config.className ? 'wid-100' : config.className;
    config.fieldGroup = [BasicFormFields.id(), this.oldOldSimpleName()];
    shortName ? config.fieldGroup.push(this.shortName()) : null;
    slug ? config.fieldGroup.push(this.slug()) : null;
    config.fieldGroup.push(this.description());

    return BasicFormFields.simpleWrapper(config);
  }

  // noinspection JSUnusedGlobalSymbols
  static dateTimeRange(config: FormlyFieldConfig = {}): FormlyFieldConfig {
    config.className = undefined === config.className ? 'wid-100' : config.className;
    config.fieldGroup = config.fieldGroup ?? [
      this.startDateTime({className: 'wid-50'}),
      this.endDateTime({className: 'wid-50'})
    ];

    return BasicFormFields.simpleWrapper(config);
  }
}
