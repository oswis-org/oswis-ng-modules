import {Injectable} from '@angular/core';
import {NgxLoggerLevel} from 'ngx-logger';
import {JWT_OPTIONS} from '@auth0/angular-jwt';
import {OswisConfig} from "./oswis.config";
import {TokenStorageService} from "../services/token-storage.service";
import {PRIMARY_MENU_ITEMS} from "./primary-menu-items";
import {SECONDARY_MENU_ITEMS} from "./secondary-menu-items";

@Injectable()
export abstract class OswisDefaultConfig implements OswisConfig {
  backendApiUrl = '';
  production = false;
  appDescription = 'Information system based on OSWIS.';
  appName = 'OSWIS';
  appTitle = 'OSWIS';

  logo = "./assets/app-images/app-logo-white.png";

  domains = ['localhost'];

  primaryMenuItems = PRIMARY_MENU_ITEMS;
  secondaryMenuItems = SECONDARY_MENU_ITEMS;
  loggerConfig = {
    serverLoggingUrl: this.getLogUrl(),
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.DEBUG,
  };
  tooltipDefaults = {
    showDelay: 200,
    hideDelay: 300,
    touchendHideDelay: 300,
    position: 'above',
    touchGestures: 'on',
  };
  notificationsOptions = {timeOut: 5000};
  // noinspection JSUnusedGlobalSymbols
  jwtOptions = {
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: (tokenStorageService: TokenStorageService) => {
        return {
          tokenGetter: this.loadTokenFactory(tokenStorageService),
          allowedDomains: this.getWhitelistedDomains(),
          disallowedRoutes: this.getJwtBlacklistedDomains(),
        };
      },
      deps: [TokenStorageService]
    }
  };

  getLogUrl(): string {
    return this.backendApiUrl + '/client_log_records';
  }

  getWhitelistedDomains(): string[] {
    return this.getAutoWhitelistedDomains();
  }

  getJwtBlacklistedDomains(): string[] {
    return this.getAutoJwtBlacklistedDomains();
  }

  getAutoWhitelistedDomains(): string[] {
    return this.domains.map((domain: String) => domain + '');
  }

  getAutoJwtBlacklistedDomains(): string[] {
    return this.domains.map((domain: String) => domain + '/admin/auth');
  }

  loadTokenFactory(tokenStorageService: TokenStorageService): () => string {
    return () => tokenStorageService.loadToken();
  }

}

