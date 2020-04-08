import {Component} from '@angular/core';
import {AuthenticationService} from "oswis-shared";

@Component({
  selector: 'oswis-app-user-logout',
  template: '<div><p>Probíhá odhlášení uživatele z aplikace...</p></div>',
})
export class AppUserLogoutComponent {
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.logout();
  }
}
