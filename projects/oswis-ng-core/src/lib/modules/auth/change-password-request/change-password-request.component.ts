import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {NGXLogger} from 'ngx-logger';
import {AppUserActionModel} from '../models/app-user-action.model';

@Component({
  selector: 'oswis-auth-change-password-request',
  templateUrl: './change-password-request.component.html',
})
export class ChangePasswordRequestComponent implements OnInit {

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

  changePasswordRequest() {
    this.model.type = AppUserActionModel.TYPE_PASSWORD_CHANGE_REQUEST;
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
