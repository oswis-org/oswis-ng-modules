import {Component, OnInit} from '@angular/core';
import {SidebarShowService} from '../../services/sidebar-show.service';
import {MenuItemModel} from '../../models/menu-item.model';
import {MenuService} from '../../services/menu.service';
import {AuthenticationService} from '../../modules/auth/services/authentication.service';

@Component({
  selector: 'app-primary-sidebar',
  templateUrl: './primary-sidebar.component.html',
  styleUrls: ['./primary-sidebar.component.css']
})
export class PrimarySidebarComponent implements OnInit {
  menuItems: MenuItemModel[];
  subMenuOpened = [];

  constructor(
    private menuService: MenuService,
    private sidebarShowService: SidebarShowService,
    private authenticationService: AuthenticationService,
  ) {
  }

  obtainMenuItems(): void {
    this.menuItems = MenuService.getMenuItems();
  }

  getAsideActive(): boolean {
    return this.sidebarShowService.getSidebarStatus(1);
  }

  ngOnInit(): void {
    this.obtainMenuItems();
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
