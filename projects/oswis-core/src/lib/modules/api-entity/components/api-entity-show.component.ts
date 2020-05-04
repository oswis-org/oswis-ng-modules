import {Component} from '@angular/core';
import {BasicModel} from "@oswis-org/oswis-shared";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiEntityService} from "../services/api-entity.service";
import {ApiEntitySingleAbstractComponent} from "./api-entity-single.abstract.component";

@Component({
  selector: 'oswis-api-entity-show',
  templateUrl: './api-entity-show.component.html',
})
export class ApiEntityShowComponent<Type extends BasicModel = BasicModel> extends ApiEntitySingleAbstractComponent<Type> {
  constructor(route: ActivatedRoute, router: Router, apiEntityService: ApiEntityService<Type>, dialog: MatDialog) {
    super(route, router, apiEntityService, dialog);
  }

  public static textParagraphOrNullField(title ?: string, value?: string): string {
    return value ? ('<p *ngIf="value"><strong>' + (title ? title + ': ' : null) + '</strong> value </p>') : null;
  }

  static downloadVCard(data: any) {
    window.open(window.URL.createObjectURL(new Blob([data], {type: 'text/vcard'})), '_blank');
  }

  asType(item): Type {
    return <Type>item;
  }
}




