import {ErrorHandler, Inject, Injectable, Injector} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {getHttpStatusCode} from './http-status-codes';
import {NGXLogger} from 'ngx-logger';
import {OSWIS_CONFIG} from "../config/oswis.config.token";
import {OswisConfig} from "../config/oswis.config";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private logger: NGXLogger, @Inject(OSWIS_CONFIG) public oswisConfig: OswisConfig,) {
  }

  handleError(error: any) {
    let errorMessage = 'V aplikaci nastala chyba. Kontaktuje správce.';
    let errorFullMessage = 'V aplikaci nastala chyba. Kontaktuje správce.';
    if (error.message) {
      errorFullMessage = error.message;
      errorMessage = error.message.length < 70 ? error.message : error.message.slice(0, 70).trim() + '...';
    } else if (error.toString().length > 2) {
      errorFullMessage = error.toString();
      errorMessage = error.toString().length < 70 ? error.toString() : error.toString().slice(0, 70).tirm + '...';
    }
    const notificationService = this.injector.get(NotificationsService);
    const statusCode = getHttpStatusCode(error.status);
    let title = (statusCode ? statusCode.localTitle : null) || error.title || 'Chyba';
    title += (statusCode ? ' (' + statusCode.code + ')' : null) || (error.status ? ' (' + error.status + ')' : null);
    let message = error.status && statusCode ? statusCode.getLocalTitleOrTitle() : '';
    message += errorMessage.length > 0 && message.length > 0 ? ', ' : '';
    message += errorMessage.length > 0 ? errorMessage : '';
    notificationService.error(title, message);
    console.log('Will do error.');
    this.logger.error(errorFullMessage || errorMessage);
    console.log('Did error.');
    if (!this.oswisConfig.production) {
      throw error;
    }
    // throw error;
  }
}
