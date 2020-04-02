import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from "@angular/router";

type Type = any;

@Injectable()
export abstract class ApiEntityInterfaceService {

  abstract getAll(): Observable<Type[]>;

  abstract getSelected(): Observable<Type>;

  abstract getSelectedId(): number;

  abstract setSelectedId(newId?: number): void;

  abstract isSelected(): boolean;

  abstract addSelectedChangedCallback(callback: () => void, context: object): void;

  abstract callSelectedChangedCallbacks(): void;

  abstract addRefreshCallback(callback: any, context: any): void;

  abstract callRefreshCallbacks(): void;

  abstract getPath(): string;

  abstract getFrontendPath(): string;

  abstract getApiUrl(): string;

  abstract post(newEntity: Type, callback?: any): Observable<Type>;

  abstract put(updatedEntity: Type, callback?: any): Observable<Type>;

  abstract postOrPut(newEntity: Type, callback?: any): Observable<Type>;

  abstract delete(entity: Type, callback?: any): Observable<Type>;

  abstract deleteById(id: number, callback?: any): Observable<Type>;

  abstract getById(id: number): Observable<Type>;

  abstract getEntityName(grCase: number, capitalize: boolean): string;

  abstract getPreSuffix(): string;

  abstract get(
    page: number,
    perPage: number,
    sort?: { column: string, order: string }[],
    filters?: { column: string, value: string }[],
    searchParamsString?: string
  ): Observable<Type[]>;

  abstract downloadPdfList(urlPath: string, type: string): Observable<any>;

  abstract setSelectedByRoute(route: ActivatedRoute): void;
}
