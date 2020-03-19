import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'oswis-auth-logout',
  template: '<div><p>Probíhá odhlášení uživatele z aplikace...</p></div>',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService,
  ) {
    this.logout();
  }

  logout() {
    const username = this.authenticationService.getCurrentUser().username;
    this.authenticationService.logout(); // reset requestPasswordReset status
    const title = 'Uživatel odhlášen';
    const message = 'Uživatel ' + username + ' byl odhlášen ze systému.';
    this.notificationService.info(title, message);
    console.log('User logged out. Navigating to /');
    this.router.navigate(['/']).then();
  }
}
