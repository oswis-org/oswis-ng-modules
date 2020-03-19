import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ApiEntityInterfaceService} from '../api-entity-interface.service';
import {SidebarShowService} from "../../../services/sidebar-show.service";
import {ApiEntityListTypeEnum} from "../enums/api-entity-list-type.enum";
import {ApiEntityListAlignEnum} from "../enums/api-entity-list-align.enum";

type Type = any;

@Component({
  selector: 'oswis-api-entity',
  template: 'Component is not properly implemented.',
})
export class ApiEntityComponent implements OnInit, OnDestroy {
  ApiEntityListTypeEnum = ApiEntityListTypeEnum;
  ApiEntityListAlignEnum = ApiEntityListAlignEnum;

  protected isNewEntity = false;
  protected isBig = false;
  protected isBigWithPanel = false;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected menuService: SidebarShowService,
    protected apiEntityService: ApiEntityInterfaceService,
    protected breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        this.isBig = state.matches;
      });

    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        this.isBigWithPanel = state.matches;
      });

    this.isNewEntity = this.router.url.indexOf('new') > 0;
  }

  ngOnInit() {
    this.selectEntityByRoute();
  }

  ngOnDestroy(): void {
    this.selectEntity(null);
  }

  forceShowList() {
    return this.menuService.getSidebarStatus() ? this.isBigWithPanel : this.isBig;
  }

  isSidenavOpened() {
    return this.menuService.getSidebarStatus();
  }

  creatingNew(): boolean {
    return this.isNewEntity;
  }

  selectEntityByRoute() {
    this.route.params.subscribe((params: ParamMap) => {
      this.apiEntityService.setSelectedId(params['id'] ? +params['id'] : null);
      const entityName = this.apiEntityService.getEntityName(1, true);
      console.log('ApiEntity ' + entityName + ' ' + params['id'] ? +params['id'] : 'not' + ' selected.');
    });
  }

  selectEntityById(newId?: number) {
    this.apiEntityService.setSelectedId(newId);
  }

  selectEntity(newEntity?: Type): void {
    this.apiEntityService.setSelectedId(newEntity ? newEntity.id : null);
  }

  isSelectedEntity(): boolean {
    return this.apiEntityService.isSelected();
  }

  newItemRoute(): string {
    return '/' + this.apiEntityService.getFrontendPath() + '/new';
  }
}

