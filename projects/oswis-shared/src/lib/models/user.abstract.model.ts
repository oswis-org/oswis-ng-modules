import {AppUserTypeModel} from './app-user-type.model';
import {NameableModel} from "./nameable.model";

export abstract class UserAbstractModel extends NameableModel {
  public username: string;
  public fullName: string;
  public active: boolean;
  public adminUser: boolean;
  public deleted: string;
  public roles: string[];
  public appUserType: AppUserTypeModel;
  public appUserFlags: any[];
  public accountActivationRequestDateTime: string;
  public accountActivationDateTime: string;
  public passwordResetRequestDateTime: string;
  public startDateTime: string;
  public endDateTime: string;

  public nickname: string;
  public givenName: string;
  public additionalName: string;
  public familyName: string;
  public honorificPrefix: string;
  public honorificSuffix: string;
  public gender: string;
  public birthDate: string;
  public subtitle: string;
  public organizationsString: string;

  public type: string;
  public contactName: string;
  public sortableName: string;
  public publicOnWeb?: boolean;
  public addressBooks: any[];
  public image: string;

  public email: string;
  public phone: string;
  public url: string;

  public allowedTypes: string[];
}
