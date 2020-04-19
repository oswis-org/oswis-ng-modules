import {Component, Input} from '@angular/core';
import {BasicModel, NameableModel} from "@oswis-org/oswis-shared";

@Component({
  selector: 'oswis-api-entity-basic-info-show',
  templateUrl: './basic-info-show.component.html',
})
export class BasicInfoShowComponent {
  @Input() boxTitle?: string;

  @Input() item?: BasicModel | NameableModel;

  exist(name: string): boolean {
    return name in this.item;
  }

  get(name: string): any {
    return this.exist(name) ? this.item[name] : null;
  }

}
