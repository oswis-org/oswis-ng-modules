import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ApiEntityInterfaceService} from './api-entity-interface.service';
import {catchError, finalize} from 'rxjs/operators';

type Type = any;

export class ApiEntityDataSource implements DataSource<Type> {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private itemsSubject = new BehaviorSubject<Type[]>([]);

  constructor(private apiEntityService: ApiEntityInterfaceService) {
    // TODO: Errors management!!!
  }

  connect(collectionViewer: CollectionViewer): Observable<Type[]> {
    return this.itemsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
    this.loadingSubject.complete();
  }

  loadItems(
    page: number = 1,
    perPage: number = 1,
    sort: { column: string, order: string }[] = [],
    filters: { column: string, value: string }[] = []
  ) {
    this.loadingSubject.next(true);
    this.apiEntityService.get(page, perPage, sort, filters)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(items => this.itemsSubject.next(items));
  }

}
