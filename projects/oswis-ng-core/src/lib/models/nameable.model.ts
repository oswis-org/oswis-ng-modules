import {BasicModel} from './basic.model';

export class NameableModel extends BasicModel {
  public name: string;
  public shortName: string;
  public slug: string;
  public forcedSlug: string;
  public description: string;
  public note: string;
  public internalNote: string;
}
