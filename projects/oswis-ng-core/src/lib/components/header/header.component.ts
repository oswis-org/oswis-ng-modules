import {Component, Inject} from '@angular/core';
import {SidebarShowService} from '../../services/sidebar-show.service';
import {AuthenticationService} from '../../modules/auth/services/authentication.service';
import {Router} from '@angular/router';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'oswis-core-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isViewportBig = false;
  isProduction: boolean;

  constructor(
    private router: Router,
    private sidebarShowService: SidebarShowService,
    protected authenticationService: AuthenticationService,
    protected breakpointObserver: BreakpointObserver,
    @Inject('production') isProduction: boolean
  ) {
    this.isProduction = isProduction;
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
    return 'OSWIS'; // TODO
  }
}
