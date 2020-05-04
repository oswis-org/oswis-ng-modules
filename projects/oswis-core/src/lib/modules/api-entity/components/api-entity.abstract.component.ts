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
  ApiEntityListTypeEnum = ApiEntityListTypeEnum;
  ApiEntityListAlignEnum = ApiEntityListAlignEnum;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(public route: ActivatedRoute, public router: Router, public apiEntityService: ApiEntityService<Type>, public dialog: MatDialog) {
    this.apiEntityService.addSelectedChangedCallback(this.refresh, this);
  }

  public static notEmptyNotes(input: any[]): any[] {
    const isNotEmpty = (element) => {
      return element.content && element.content.length > 0
    };
    return input.filter(isNotEmpty);
  }

  abstract refresh(): void;

  ngOnInit() {
    this.apiEntityService.setSelectedByRoute(this.route);
  }

  ngOnDestroy(): void {
    this.unselectAll();
  }

  selectEntityById(newId?: number) {
    // console.log('selectEntityById() newId: ', newId, 'class', this.toString());
    this.apiEntityService.setSelectedId(newId);
  }

  selectEntity(newEntity?: BasicModel): void {
    this.apiEntityService.setSelectedId(newEntity ? newEntity.id : null);
  }

  unselectAll(): void {
    console.log('ApiEntityAbstract: Unselect all.');
    this.selectEntity(null);
  }

  isSelectedEntity(): boolean {
    return this.apiEntityService.isSelected();
  }

  public getUnnamedTitle(): string { // noinspection SpellCheckingInspection
    return 'Nepojmenovan' + this.getPreSuffix() + ' ' + this.getEntityName(1, false);
  }

  public edit(): void {
    this.router.navigate(['./edit'], {relativeTo: this.route}).then();
  }

  public backToList(): void {
    this.apiEntityService.setSelectedId();
    this.router.navigate(['/' + this.apiEntityService.getFrontendPath()]).then();
  }

  backToShow() {
    this.router
      .navigate(['/' + this.apiEntityService.getFrontendPath() + '/' + this.apiEntityService.getSelectedId()])
      .then();
  }

  getDialogConfig(action: ListActionModel, extraData: object = null, items: object[] = null): MatDialogConfig {
    return {data: {items: items, action: action, extraData: extraData}};
  }

  getApiUrl(): string {
    return this.apiEntityService.getApiUrl();
  }

  public notEmptyNotes(input: any[]): any[] {
    return ApiEntityAbstractComponent.notEmptyNotes(input);
  }

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    return this.apiEntityService.getEntityName(grCase, capitalize);
  }

  public getPreSuffix(): string {
    return this.apiEntityService.getPreSuffix();
  }

  newItemRoute(): string {
    return '/' + this.apiEntityService.getFrontendPath() + '/new';
  }

  abstract processDialogResult(context: ApiEntityAbstractComponent, action: ListActionModel, dialogResult, dialogRef): void;

  openDialog(action: ListActionModel, extraData: object = null, items: object[] = null): void {
    const that = this;
    const dialogRef = that.dialog.open(action.dialog, this.getDialogConfig(action, extraData, items));
    dialogRef.beforeClosed().subscribe(dialogResult => this.processDialogResult(that, action, dialogResult, dialogRef));
  }
}
