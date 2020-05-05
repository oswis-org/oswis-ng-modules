import {BasicModel} from "./basic.model";

export abstract class AbstractImageModel extends BasicModel {
  file: string;
  contentUrl: string;
}
