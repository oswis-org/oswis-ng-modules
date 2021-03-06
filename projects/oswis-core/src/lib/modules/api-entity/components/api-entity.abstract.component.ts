import {Directive, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiEntityListTypeEnum} from "../enums/api-entity-list-type.enum";
import {ApiEntityListAlignEnum} from "../enums/api-entity-list-align.enum";
import {ListActionModel} from "../models/list-action.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApiEntityService} from "../services/api-entity.service";
import {BasicModel} from "@oswis-org/oswis-shared";

@Directive()
export abstract class ApiEntityAbstractComponent<Type extends BasicModel = BasicModel> implements OnInit, OnDestroy {
  public COL_TYPE = ApiEntityListTypeEnum;
  public COL_ALIGN = ApiEntityListAlignEnum;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(public route: ActivatedRoute, public router: Router, public service: ApiEntityService<Type>, public dialog: MatDialog) {
    if (null !== service) {
      this.service.addSelectedChangedCallback(this.refresh, this);
    }
  }

  public static filterOnlyWithContent(input: any[]): any[] {
    const isNotEmpty = (element) => {
      return element.content && element.content.length > 0
    };
    return input.filter(isNotEmpty);
  }

  abstract refresh(): void;

  ngOnInit() {
    if (this.route) {
      this.service.setSelectedByRoute(this.route);
    }
  }

  ngOnDestroy(): void {
    this.unselectAll();
  }

  selectEntityById(newId?: number) {
    // console.log('selectEntityById() newId: ', newId, 'class', this.toString());
    this.service.setSelectedId(newId);
  }

  selectEntity(newEntity?: BasicModel): void {
    this.service.setSelectedId(newEntity ? newEntity.id : null);
  }

  unselectAll(): void {
    console.log('ApiEntityAbstract: Unselect all.');
    this.selectEntity(null);
  }

  isSelectedEntity(): boolean {
    return this.service.isSelected();
  }

  public getUnnamedTitle(): string { // noinspection SpellCheckingInspection
    return 'Nepojmenovan' + this.getPreSuffix() + ' ' + this.getEntityName(1, false);
  }

  public edit(): void {
    this.router.navigate(['./edit'], {relativeTo: this.route}).then();
  }

  public backToList(): void {
    this.service.setSelectedId();
    this.router.navigate(['/' + this.service.getFrontendPath()]).then();
  }

  backToShow() {
    this.router.navigate(['/' + this.service.getFrontendPath() + '/' + this.service.getSelectedId()]).then();
  }

  getDialogConfig(action: ListActionModel, extraData: object = null, items: object[] = null): MatDialogConfig {
    return {
      data: {
        items: items,
        action: action,
        extraData: extraData,
        ...action.data,
      }
    };
  }

  getApiUrl(): string {
    return this.service.getApiUrl();
  }

  public notEmptyNotes(input: any[]): any[] {
    return ApiEntityAbstractComponent.filterOnlyWithContent(input);
  }

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    return this.service.getEntityName(grCase, capitalize);
  }

  public getPreSuffix(): string {
    return this.service.getPreSuffix();
  }

  newItemRoute(): string {
    return '/' + this.service.getFrontendPath() + '/new';
  }

  abstract processDialogResult(context: ApiEntityAbstractComponent, action: ListActionModel, dialogResult, dialogRef): void;

  openDialog(action: ListActionModel, extraData: object = null, items: object[] = null): void {
    const that = this;
    const dialogRef = that.dialog.open(action.dialog, that.getDialogConfig(action, extraData, items));
    console.log('Open dialog: dialogRef: ', dialogRef);
    dialogRef.beforeClosed().subscribe(dialogResult => that.processDialogResult(that, action, dialogResult, dialogRef));
  }
}
