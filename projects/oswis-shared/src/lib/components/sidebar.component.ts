import {Component, Inject, Input} from '@angular/core';
import {SidebarShowService} from '../services/sidebar-show.service';
import {MenuItemModel} from '../models/menu-item.model';
import {AuthenticationService} from '../services/authentication.service';
import {OSWIS_CONFIG} from "../config/oswis.config.token";
import {OswisConfig} from "../config/oswis.config";

@Component({
  selector: 'oswis-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sidebarId: number = 0;
  @Input() menuItems: MenuItemModel[] = [];
  subMenuOpened = [];

  constructor(
    private sidebarShowService: SidebarShowService,
    private authenticationService: AuthenticationService,
    @Inject(OSWIS_CONFIG) protected oswisConfig: OswisConfig,
  ) {
  }

  getAsideActive(): boolean {
    return this.sidebarShowService.getSidebarStatus(this.sidebarId);
  }

  toggleSubMenu(index: number) {
    return this.subMenuOpened[index] = this.subMenuOpened[index] ? !this.subMenuOpened[index] : true;
  }

  isSubmenuOpened(index: number) {
    return this.subMenuOpened[index] ? this.subMenuOpened[index] : false;
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
