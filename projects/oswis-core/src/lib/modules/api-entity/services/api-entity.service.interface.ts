import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from "@angular/router";
import {BasicModel} from "@oswis-org/oswis-shared";
import {JsonLdListResponseModel} from "../models/json-ld-list-response.model";
import {FilterKeyValue} from "../models/filter-key-value.model";

@Injectable()
export abstract class ApiEntityServiceInterface<Type extends BasicModel = BasicModel> {
  // noinspection JSUnusedGlobalSymbols
  abstract getAll(): Observable<Type[]>;

  abstract getSelected(): Observable<Type>;

  abstract getSelectedId(): number;

  abstract setSelectedId(newId?: number): void;

  abstract isSelected(): boolean;

  abstract addSelectedChangedCallback(callback: () => void, context: object): void;

  abstract callSelectedChangedCallbacks(): void;

  abstract addRefreshCallback(callback: any, context: any): void;

  abstract callRefreshCallbacks(): void;

  // noinspection JSUnusedGlobalSymbols
  abstract getPath(): string;

  abstract getFrontendPath(): string;

  abstract getApiUrl(): string;

  abstract post(newEntity: Type, callback?: any): Observable<Type>;

  abstract put(updatedEntity: Type, callback?: any): Observable<Type>;

  abstract postOrPut(newEntity: Type, callback?: any): Observable<Type>;

  // noinspection JSUnusedGlobalSymbols
  abstract delete(entity: Type, callback?: any): Observable<Type>;

  abstract deleteById(id: number, callback?: any): Observable<Type>;

  abstract getById(id: number): Observable<Type>;

  abstract getEntityName(grCase: number, capitalize: boolean): string;

  abstract getPreSuffix(): string;

  abstract getCollection(page: number, perPage: number, filters?: FilterKeyValue[]): Observable<JsonLdListResponseModel<Type>>;

  abstract downloadExport(filters: FilterKeyValue[], urlPath: string, singleEntityId: number, mimeType: string, fileName: string): Observable<any>;

  abstract setSelectedByRoute(route: ActivatedRoute): void;
}
