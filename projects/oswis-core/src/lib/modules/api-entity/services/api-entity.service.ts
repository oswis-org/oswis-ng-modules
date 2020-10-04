import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApiEntityServiceInterface} from './api-entity.service.interface';
import {NotificationsService} from 'angular2-notifications';
import {catchError, retry, tap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BasicModel, OSWIS_CONFIG, OswisConfig} from "@oswis-org/oswis-shared";
import {JsonLdListResponseModel} from "../models/json-ld-list-response.model";
import {KeyValue} from "@angular/common";
import {FilterKeyValue} from "../models/filter-key-value.model";
import {ErrorHandlerService} from "../../../../../../oswis-shared/src/lib/services/error-handler.service";

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

  constructor(
    protected http: HttpClient,
    protected notificationService: NotificationsService,
    @Inject(OSWIS_CONFIG) protected oswisConfig: OswisConfig,
  ) {
    this.baseUrl = oswisConfig.backendApiUrl;
  }

  static capitalize(value: any): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  public static handleError(text: string, err: HttpErrorResponse) {
    return ErrorHandlerService.handleError(text, err);
  }

  public static convertBase64toArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  public static getDownloadLink(x, fileName, mimeType: string = 'application/pdf') {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([this.convertBase64toArrayBuffer(x.data)], {type: mimeType}));
    link.download = fileName;
    return link;
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
    return this.http.get<Type[]>(this.getApiUrl()).pipe(
      retry(this.retryCount),
      catchError((err) => {
        return ApiEntityService.handleError('Nelze získat data', err);
      })
    );
  }

  getFiltersString(filters: KeyValue<string, string | number | boolean | null>[] = []): string {
    let result = '';
    for (let index in filters) {
      const filter = filters[index];
      if (filter.value['type']) {
        result += filter.key ? `&order[${filter.key}]=` + (filter.value ? `${filter.value}` : 'asc') : '';
        continue;
      }
      result += filter.key ? `&${filter.key}=${filter.value ?? ''}` : '';
    }
    return result;
  }

  getCollectionUrlParams(page: number = 1, perPage: number = 1, filters: FilterKeyValue[] = []): string {
    let urlParams = perPage > 0 ? `?pagination=true&itemsPerPage=${perPage}&page=${page}` : '?pagination=false';
    urlParams += this.getFiltersString(filters);
    return urlParams;
  }

  getCollection(page: number = 1, perPage: number = 1, filters: FilterKeyValue[] = []): Observable<JsonLdListResponseModel<Type>> {
    console.log("getCollection: ");
    return this.http.get<JsonLdListResponseModel<Type>>(this.getApiUrl() + '.jsonld' + this.getCollectionUrlParams(page, perPage, filters))
      .pipe(
        retry(this.retryCount),
        catchError((err) => {
          return ApiEntityService.handleError('Nelze získat data', err);
        })
      );
  }

  downloadExport(
    filters: FilterKeyValue[] = [],
    urlPath: string = 'export/pdf',
    singleEntityId: number = null,
    mimeType: string = 'application/pdf',
    fileName: string = 'oswis-export.pdf'
  ): Observable<{ data: string }> {
    return this.getExport(filters, urlPath).pipe(
      tap(x => {
        ApiEntityService.getDownloadLink(x, fileName, mimeType).click();
      })
    )
  }

  getExport(filters: FilterKeyValue[] = [], urlPath: string = 'export/pdf', singleEntityId: number = null,): Observable<{ data: string }> {
    let url = this.getApiUrl() + '/';
    url += null === singleEntityId ? urlPath + this.getCollectionUrlParams(1, 0, filters) : (singleEntityId + '/' + urlPath);
    return this.http.get<{ data: string }>(url, {}).pipe(
      tap(() => {
        this.notificationService.success('Stahování...', 'Pokus o stažení exportu do zařízení.');
      }),
      catchError((error) => {
        ApiEntityService.handleError('Nelze stáhnout soubor.', error);
        return new Observable<{ data: string }>();
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
    return this.http.get<Type>(this.getApiUrl() + '/' + id).pipe(
      retry(this.retryCount),
      catchError((err) => {
        return ApiEntityService.handleError('Nelze načíst položku', err);
      })
    );
  }

  post(newEntity: Type, callback?: any): Observable<Type> {
    return this.http.post<Type>(this.getApiUrl(), newEntity).pipe(
      tap(x => {
        const title = this.getEntityName() + ' vytvořen' + this.getA() + '.';
        const message = this.getEntityName() + ' ' + (x['id'] || '') + ' ' + ' byl' + this.getA() + ' úspěšně vytvořen' + this.getA() + '.';
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
    return this.http.put<Type>(this.getApiUrl() + '/' + updatedEntity.id, updatedEntity).pipe(
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
    if (updatedEntity) {
      return updatedEntity.id && updatedEntity.id > 0 ? this.post(updatedEntity, callback) : this.put(updatedEntity, callback);
    }
    return new Observable();
  }

  delete(entity: Type, callback?: any): Observable<Type> {
    return entity && entity.id > 0 ? this.deleteById(entity.id, callback) : new Observable<Type>();
  }

  deleteById(id: number, callback?: any): Observable<Type> {
    if (id && id > 0) {
      return this.http.delete<Type>(this.getApiUrl() + '/' + id).pipe(
        tap(() => {
          const title = this.getEntityName() + ' smazán' + this.getA() + '.';
          const message = this.getEntityName() + ' ' + id + ' ' + ' byl' + this.getA() + ' úspěšně smazán' + this.getA() + '.';
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
    if (!this.callbacksSelectedChanged.includes(callbackItem)) {
      console.log('ApiEntityService (' + this + '): Add SelectedChangedCallback.', callbackItem);
      this.callbacksSelectedChanged.push(callbackItem);
      console.log('ApiEntityService (' + this + '): Has ' + this.callbacksSelectedChanged.length + ' SelectedChangedCallbacks now.', callbackItem);
    }
  }

  callSelectedChangedCallbacks(): void {
    console.log('ApiEntityService: Call SelectedChangedCallbacks (' + this.callbacksSelectedChanged.length + ').');
    this.callbacksSelectedChanged.forEach(
      callback => {
        console.log('ApiEntityService: SelectedChangedCallback: ');
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
