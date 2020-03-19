import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {NGXLogger} from 'ngx-logger';
import {AppUserActionModel} from '../models/app-user-action.model';

@Component({
  selector: 'oswis-auth-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  model = new AppUserActionModel();
  loading = false;
  error = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public notificationService: NotificationsService,
    public logger: NGXLogger,
  ) {
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']).then();
  }

  redirectToPasswordChangeRequest() {
    this.router.navigate(['/auth/change-password-request']).then();
  }

  changePassword() {
    this.model.type = AppUserActionModel.TYPE_PASSWORD_CHANGE;
    this.authenticationService.appUserAction(this.model).subscribe();
  }

  ngOnInit(): void {
    this.setTokenFromUrl();
  }

  setTokenFromUrl() {
    this.route.params.subscribe(
      (params: ParamMap) => {
        if (params['token']) {
          this.model.token = params['token'];
        }
      }
    );
  }
}
