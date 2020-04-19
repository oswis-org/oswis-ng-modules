import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApiEntityServiceInterface} from './api-entity.service.interface';
import {NotificationsService} from 'angular2-notifications';
import {catchError, retry, tap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AuthenticationService, BasicModel, OSWIS_CONFIG, OswisConfig} from "@oswis-org/oswis-shared";
import {JsonLdListResponse} from "../models/json-ld-list.response";

@Injectable({
  providedIn: 'root'
})
export class ApiEntityService<Type extends BasicModel = BasicModel> implements ApiEntityServiceInterface<Type> {
  protected baseUrl: string;
  protected path: string;
  protected frontendPath: string;
  protected entityName = {
    1: 'položka', 2: 'položky', 3: 'položce', 4: 'položku', 6: 'položce', 7: 'položkou', 'a': '(a)',
    11: 'položky', 12: 'položek', 13: 'položkám', 14: 'položky', 16: 'položkách', 17: 'položkami', 'preSuffix': 'á',
  };

  /*
    1. nominativ (kdo, co?)
    2. genitiv (koho, čeho?)
    3. dativ (komu, čemu?)
    4. akuzativ (koho, co?)
    5. vokativ (oslovujeme, voláme)
    6. lokál neboli lokativ (o kom, o čem?)
    7. instrumentál (kým, čím?)
   */
  // protected retryDelay = 300;
  protected retryCount = 2;
  protected selectedEntityId? = null;
  protected callbacksSelectedChanged: { callback: any; context: any }[] = [];
  protected callbacksRefresh = [];

  constructor(protected http: HttpClient, protected notificationService: NotificationsService, @Inject(OSWIS_CONFIG) protected oswisConfig: OswisConfig) {
    this.baseUrl = oswisConfig.backendApiUrl;
  }

  static capitalize(value: any): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  public static handleError(text: string, err: HttpErrorResponse) {
    return AuthenticationService.handleError(text, err);
  }

  public getPath(): string {
    return this.path;
  }

  public getFrontendPath(): string {
    return this.frontendPath;
  }

  public getApiUrl(): string {
    return this.baseUrl + '/' + this.path;
  }

  getAll(): Observable<Type[]> {
    console.log('Get all items from API (' + this.path + ').');
    return this.http.get<Type[]>(this.getApiUrl())
      .pipe(
        retry(this.retryCount),
        catchError((err) => {
          return ApiEntityService.handleError('Nelze získat data', err);
        })
      );
  }

  get(
    page: number = 1,
    perPage: number = 1,
    sort: { column: string, order: string }[] = [],
    filters: { column: string, value: string }[] = [],
    searchParamString: string = ''
  ): Observable<JsonLdListResponse<Type>> {
    const searchParamUrlString = searchParamString ? '&' + searchParamString : '';
    let urlParams = `?pagination=true&itemsPerPage=${perPage}&page=${page}&${searchParamUrlString}`;
    sort.forEach(
      oneSort => {
        if (oneSort.column) {
          urlParams += `&order[${oneSort.column}]=`;
          urlParams += oneSort.order ? `${oneSort.order}` : 'asc';
        }
      }
    );
    filters.forEach(
      filter => {
        if (filter.column && filter.value) {
          urlParams += `&${filter.column}=${filter.value}`;
        }
      }
    );
    console.log('Get some items from API (' + this.path + ').');
    return this.http.get<JsonLdListResponse<Type>>(this.getApiUrl() + '.jsonld' + urlParams)
      .pipe(
        retry(this.retryCount),
        catchError((err) => {
          return ApiEntityService.handleError('Nelze získat data', err);
        })
      );
  }

  getSelected(): Observable<Type> {
    if (this.selectedEntityId === null || this.selectedEntityId < 0) {
      return new Observable<Type>();
    }
    return <Observable<Type>>this.http.get<Type>(this.getApiUrl() + '/' + this.selectedEntityId)
      .pipe(
        retry(this.retryCount),
        catchError((err) => {
          return ApiEntityService.handleError('Nelze načíst položku', err);
        })
      );
  }

  getById(id: number): Observable<Type> {
    if (!id || id < 1) {
      return new Observable<Type>();
    }
    return this.http.get<Type>(this.getApiUrl() + '/' + id)
      .pipe(
        retry(this.retryCount),
        catchError((err) => {
          return ApiEntityService.handleError('Nelze načíst položku', err);
        })
      );
  }

  post(newEntity: Type, callback?: any): Observable<Type> {
    return this.http.post<Type>(this.getApiUrl(), newEntity)
      .pipe(
        tap(x => {
          const title = this.getEntityName() + ' vytvořen' + this.getA() + '.';
          const message = this.getEntityName() + ' ' + (x['id'] || '') + ' ' +
            ' byl' + this.getA() + ' úspěšně vytvořen' + this.getA() + '.';
          this.callRefreshCallbacks();
          if (callback) {
            callback();
          }
          this.notificationService.success(title, message);
        }),
        catchError((err) => {
          const errorMessage = 'Nelze vytvořit ' + this.getEntityName(4, false) + ' ' + newEntity.id + '.';
          ApiEntityService.handleError(errorMessage, err);
          return new Observable<Type>();
        })
      );
  }

  put(updatedEntity: Type, callback?: any): Observable<Type> {
    console.log('Will put: ');
    console.log(updatedEntity);
    return this.http.put<Type>(this.getApiUrl() + '/' + updatedEntity.id, updatedEntity)
      .pipe(
        tap(() => {
          const title = this.getEntityName() + ' upraven' + this.getA() + '.';
          const message = this.getEntityName() + ' ' + updatedEntity.id + ' ' + ' byl' + this.getA() + ' úspěšně upraven' + this.getA() + '.';
          this.callRefreshCallbacks();
          if (callback) {
            callback();
          }
          this.notificationService.success(title, message);
        }),
        catchError((err) => {
          const errorMessage = 'Nelze vytvořit ' + this.getEntityName(4, false) + ' ' + updatedEntity.id + '.';
          ApiEntityService.handleError(errorMessage, err);
          return new Observable<Type>();
        })
      );
  }

  postOrPut(updatedEntity: Type, callback?: any): Observable<Type> {
    if (updatedEntity && updatedEntity.id && updatedEntity.id > 0) {
      return this.put(updatedEntity, callback);
    } else if (updatedEntity) {
      return this.post(updatedEntity, callback);
    }
    return new Observable();
  }

  delete(entity: Type, callback?: any): Observable<Type> {
    return entity && entity.id > 0 ? this.deleteById(entity.id, callback) : new Observable<Type>();
  }

  deleteById(id: number, callback?: any): Observable<Type> {
    if (id && id > 0) {
      return this.http.delete<Type>(this.getApiUrl() + '/' + id)
        .pipe(
          tap(() => {
            const title = this.getEntityName() + ' smazán' + this.getA() + '.';
            const message = this.getEntityName() + ' ' + id + ' ' +
              ' byl' + this.getA() + ' úspěšně smazán' + this.getA() + '.';
            this.callRefreshCallbacks();
            if (callback) {
              callback();
            }
            this.notificationService.success(title, message);
          }),
          catchError((err) => {
            const errorMessage = 'Nelze smazat ' + this.getEntityName(4, false) + ' ' + id + '.';
            ApiEntityService.handleError(errorMessage, err);
            return new Observable<Type>();
          })
        );
    }
    return new Observable<Type>();
  }

  getSelectedId(): number | null {
    return this.isSelected() ? this.selectedEntityId : null;
  }

  setSelectedId(newId: number = -1): void {
    setTimeout(() => {
      this.selectedEntityId = newId;
      console.log('ApiEntityService: Selected entity ' + newId + '.');
      this.callSelectedChangedCallbacks();
    });
  }

  isSelected(): boolean {
    return this.selectedEntityId !== null && this.selectedEntityId >= 0;
  }

  addSelectedChangedCallback(callback: any, context: any): void {
    const callbackItem = {callback: callback, context: context};
    console.log('ApiEntityService (' + typeof this + '): Add SelectedChangedCallback.', callbackItem);
    if (!this.callbacksSelectedChanged.includes(callbackItem)) {
      this.callbacksSelectedChanged.push(callbackItem);
    }
  }

  callSelectedChangedCallbacks(): void {
    console.log('ApiEntityService: Call callbacks.');
    this.callbacksSelectedChanged.forEach(
      callback => {
        console.log('ApiEntityService: Callback: ');
        console.log(callback);
        callback.callback.call(callback.context);
      });
  }

  addRefreshCallback(callback: any, context: any): void {
    this.callbacksRefresh.push({callback: callback, context: context});
  }

  callRefreshCallbacks(): void {
    this.callbacksRefresh.forEach(
      callback => callback.callback.call(callback.context));
  }

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    if (capitalize) {
      return ApiEntityService.capitalize(this.entityName[grCase]);
    }
    return this.entityName[grCase];
  }

  public getA(): string {
    return this.entityName.a;
  }

  public getPreSuffix(): string {
    return this.entityName.preSuffix || '';
  }

  downloadPdfList(urlPath: string, type: string = 'get-list-pdf'): Observable<any> {
    console.log('Downloading resource as PDF...');
    const req = {};
    req['type'] = type;
    return this.http.post<any>(this.baseUrl + '/' + urlPath, req)
      .pipe(
        tap(() => {
          // window.open(this.baseUrl + '/' + x.download);
          const title = 'Stahování...';
          const message = 'Pokus o stažení souboru do zařízení.';
          this.notificationService.success(title, message);
        }),
        catchError((err) => {
          const errorMessage = 'Nelze stáhnout soubor.';
          ApiEntityService.handleError(errorMessage, err);
          return new Observable();
        })
      );
  }

  setSelectedByRoute(route: ActivatedRoute): void {
    if (!route) {
      return;
    }
    route.params.subscribe((params: ParamMap) => {
      this.setSelectedId(params['id'] ? +params['id'] : null);
      console.log('ApiEntity ' + this.getEntityName(1, true) + ' ' + params['id'] ? +params['id'] : 'not' + ' selected.');
    });
  }
}
