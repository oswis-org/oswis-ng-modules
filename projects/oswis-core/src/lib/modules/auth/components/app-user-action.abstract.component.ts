import {OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppUserActionModel, AuthenticationService} from "@oswis-org/oswis-shared";

export abstract class AppUserActionAbstractComponent implements OnInit {
  actionType: string;
  model = new AppUserActionModel();
  loading = false;
  error = '';

  constructor(public route: ActivatedRoute, public authenticationService: AuthenticationService,) {
  }

  processAction() {
    this.model.type = this.actionType;
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
