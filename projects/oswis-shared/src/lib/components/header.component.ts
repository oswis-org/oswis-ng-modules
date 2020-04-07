import {Component, Inject} from '@angular/core';
import {SidebarShowService} from '../services/sidebar-show.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {OSWIS_CONFIG} from "../config/oswis.config.token";
import {OswisConfig} from "../config/oswis.config";

@Component({
  selector: 'oswis-core-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isViewportBig = false;

  constructor(
    public router: Router,
    public sidebarShowService: SidebarShowService,
    public authenticationService: AuthenticationService,
    public breakpointObserver: BreakpointObserver,
    @Inject(OSWIS_CONFIG) public oswisConfig: OswisConfig,
  ) {
    this.breakpointObserver
      .observe(['(min-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        this.isViewportBig = state.matches;
      });
  }

  redirectToLogin() {
    return this.router.navigate(['/auth/login']);
  }

  redirectToHomepage() {
    return this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.authenticationService.isAuthenticated();
  }

  getCurrentUser() {
    return this.authenticationService.getCurrentUser();
  }

  toggleSidebar(id: number = 1) {
    return this.sidebarShowService.toggleSidebar(id);
  }

  getAppTitle(): string {
    return this.oswisConfig.appTitle; // TODO
  }
}
