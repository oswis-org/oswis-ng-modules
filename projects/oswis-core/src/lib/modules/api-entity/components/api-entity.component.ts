import {Component} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiEntityAbstractComponent} from "./api-entity.abstract.component";
import {MatDialog} from "@angular/material/dialog";
import {ListActionModel} from "../models/list-action.model";
import {ApiEntityService} from "../services/api-entity.service";
import {BasicModel, SidebarShowService} from "@oswis-org/oswis-shared";

@Component({
  selector: 'oswis-api-entity',
  template: 'Component is not properly implemented.',
})
export class ApiEntityComponent<Type extends BasicModel = BasicModel> extends ApiEntityAbstractComponent<Type> {
  protected isNewEntity = false;
  protected isViewBig = false;
  protected isViewBigWithPanel = false;

  constructor(
    route: ActivatedRoute,
    router: Router,
    service: ApiEntityService<Type>,
    dialog: MatDialog,
    protected menuService: SidebarShowService,
    protected breakpointObserver: BreakpointObserver,
  ) {
    super(route, router, service, dialog);
    this.mobileBreakpointObserver();
    this.wideBreakpointObserver();
    this.isNewEntity = this.router.url.indexOf('new') > 0;
  }

  processDialogResult(context: ApiEntityAbstractComponent, action: ListActionModel, dialogResult, dialogRef): void {
    console.error('Dialog processing is not implemented in ApiEntityComponent.');
  }

  mobileBreakpointObserver(): void {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        this.isViewBig = state.matches;
      });
  }

  wideBreakpointObserver(): void {
    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        this.isViewBigWithPanel = state.matches;
      });
  }

  forceShowList() {
    return this.menuService.getSidebarStatus() ? this.isViewBigWithPanel : this.isViewBig;
  }

  isSidenavOpened() {
    return this.menuService.getSidebarStatus();
  }

  creatingNew(): boolean {
    return this.isNewEntity;
  }

  refresh(): void {
  }
}

