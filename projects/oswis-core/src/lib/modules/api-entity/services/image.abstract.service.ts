import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import {AbstractImageModel, OSWIS_CONFIG, OswisConfig} from '@oswis-org/oswis-shared';
import {NotificationsService} from 'angular2-notifications';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiEntityService} from "./api-entity.service";

@Injectable({
  providedIn: 'root'
})
export abstract class ImageAbstractService<Type extends AbstractImageModel = AbstractImageModel> extends ApiEntityService<Type> {
  constructor(
    protected http: HttpClient,
    protected notificationService: NotificationsService,
    @Inject(OSWIS_CONFIG) oswisCoreConfig: OswisConfig,
  ) {
    super(http, notificationService, oswisCoreConfig);
    this.path = 'abstract_image';
    this.frontendPath = null;
    this.entityName = {
      1: 'obrázek', 2: 'obrázku', 3: 'obrázku', 4: 'obrázek', 6: 'obrázku', 7: 'obrázkem', 11: 'obrázky',
      12: 'obrázků', 13: 'obrázkům', 14: 'obrázky', 16: 'obrázcích', 17: 'obrázky', a: '', preSuffix: 'ý'
    };
  }

  postImage(body: FormData): Observable<Type> {
    let headers = new HttpHeaders();
    /*
    headers = headers.append(
      'Content-Type',
      'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2)
    );
    */
    headers = headers.append(
      'Content-Type',
      'multipart/form-data'
    );

    console.log(headers);
    console.log(body);

    return this.http.post<Type>(this.getApiUrl(), body)
      .pipe(
        tap(() => {
          const title = this.getEntityName() + ' vytvořen' + this.getA() + '.';
          const message = this.getEntityName() + ' ' + ' ' +
            ' byl' + this.getA() + ' úspěšně vytvořen' + this.getA() + '.';
          this.callRefreshCallbacks();
          this.notificationService.success(title, message);
        }),
        catchError((err, caught) => {
          const errorMessage = 'Nelze vytvořit ' + this.getEntityName(4, false) + '.';
          ApiEntityService.handleError(errorMessage, err);
          return new Observable<Type>();
        })
      );
  }

}
