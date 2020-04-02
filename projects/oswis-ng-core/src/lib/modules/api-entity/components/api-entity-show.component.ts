import {Component} from '@angular/core';
import {ApiEntitySingleAbstractComponent} from "./api-entity-single.abstract.component";

@Component({
  selector: 'oswis-api-entity-show',
  templateUrl: './api-entity-show.component.html',
})
export class ApiEntityShowComponent extends ApiEntitySingleAbstractComponent {

  public static textParagraphOrNullField(title ?: string, value?: string): string {
    return value ? ('<p *ngIf="value"><strong>' + (title ? title + ': ' : null) + '</strong> value </p>') : null;
  }

  static downloadVCard(data: any) {
    const blob = new Blob([data], {type: 'text/vcard'});
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}




