import {Component, OnInit} from '@angular/core';
import {SidebarShowService} from '../../services/sidebar-show.service';
import {MenuItemModel} from '../../models/menu-item.model';
import {MenuService} from '../../services/menu.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../modules/auth/services/authentication.service';

@Component({
  selector: 'app-secondary-sidebar',
  templateUrl: './secondary-sidebar.component.html',
  styleUrls: ['./secondary-sidebar.component.css']
})
export class SecondarySidebarComponent implements OnInit {
  menuItems: MenuItemModel[];
  subMenuOpened = [];
  loggingIn = false;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private sidebarShowService: SidebarShowService,
    private authenticationService: AuthenticationService,
  ) {
  }

  obtainMenuItems(): void {
    this.menuItems = MenuService.getProfileMenuItems();
  }

  getAsideActive(): boolean {
    return this.sidebarShowService.getSidebarStatus(2);
  }

  redirectToLogout() {
    this.router.navigate(['/auth/logout']).then();
  }

  ngOnInit(): void {
    this.obtainMenuItems();
  }

  toggleSubMenu(index: number) {
    this.subMenuOpened[index] = this.subMenuOpened[index] ? !this.subMenuOpened[index] : true;
    return this.subMenuOpened[index];
  }

  isSubmenuOpened(index: number) {
    return this.subMenuOpened[index] ? this.subMenuOpened[index] : false;
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
