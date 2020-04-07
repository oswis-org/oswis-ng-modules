import {JwtModuleOptions} from '@auth0/angular-jwt';
import {LoggerConfig} from 'ngx-logger';
import {MatTooltipDefaultOptions} from '@angular/material/tooltip';
import {Options as Angular2NotificationsOptions} from 'angular2-notifications/lib/interfaces/options.type';
import {MenuItemModel} from "../models/menu-item.model";

export interface OswisConfig {
  appTitle: string;
  appName: string;
  appDescription: string;
  backendApiUrl: string;
  production: boolean;

  logo: string;

  domains: string[];
  jwtOptions?: JwtModuleOptions;
  loggerConfig?: LoggerConfig;
  tooltipDefaults?: MatTooltipDefaultOptions | object;
  notificationsOptions?: Angular2NotificationsOptions;
  primaryMenuItems?: MenuItemModel[];
  secondaryMenuItems?: MenuItemModel[];

  getWhitelistedDomains(): string[];

  getJwtBlacklistedDomains(): string[];
}
