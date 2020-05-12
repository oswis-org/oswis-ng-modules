import {fromEvent} from 'rxjs';
import {merge} from 'rxjs/observable/merge';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {catchError} from 'rxjs/operators/catchError';
import {of as observableOf} from 'rxjs/observable/of';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ListActionModel} from '../models/list-action.model';
import {ApiEntityService} from "../services/api-entity.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ColumnDefinitionModel} from '../models/column-definition.model';
import {ApiEntityAbstractComponent} from "./api-entity.abstract.component";
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {JsonLdListResponse} from "../models/json-ld-list.response";
import {BasicModel} from "@oswis-org/oswis-shared";

@Component({
  selector: 'oswis-api-entity-list',
  templateUrl: './api-entity-list.component.html',
})
export class ApiEntityListComponent<Type extends BasicModel = BasicModel> extends ApiEntityAbstractComponent<Type> implements AfterViewInit {
  public readonly F_DATE = 'd.M.y';
  public readonly F_DATE_TIME = 'd.M.y HH:mm';

  @Input() public service: ApiEntityService<Type>;
  @Input() displayedColumns: string[];
  @Input() columnDefs: ColumnDefinitionModel[];
  @Input() searchValue: string;
  @Input() actionSingleButtons: ListActionModel[] = [];
  @Input() actionSingleLinks: ListActionModel[] = [];
  @Input() actionMultipleMenuItems: ListActionModel[] = [];
  @Input() actionGlobalButtons: ListActionModel[] = [];
  @Input() actionStaticButtons: ListActionModel[] = [{name: 'Filtry', icon: 'filter_list', action: this.toggleShowFilterWrapper()}];
  @Input() defaultSearchColumn = 'search';
  @Input() pageSize = 10;
  @Input() searchColumns: string[];
  @Input() searchParamsString = '';

  public orderColumns: string[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  public showFilter = false;
  dataSource = new MatTableDataSource<BasicModel>();
  selection = new SelectionModel<BasicModel>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchInput', {read: ElementRef, static: true}) searchInput: ElementRef;

  constructor(public http: HttpClient, route: ActivatedRoute, router: Router, service: ApiEntityService<Type>, dialog: MatDialog) {
    super(route, router, service, dialog);
  }

  static searchFilterPredicate(data, filter) {
    let filterData = JSON.stringify(data);
    filterData = filterData.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log('filter: ' + filter + ', data: ' + data);
    return filterData.includes(filter);
  }

  static convertBase64toArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  public static getDownloadLink(x, fileName, mimeType: string = 'application/pdf') {
    const blob = new Blob([ApiEntityListComponent.convertBase64toArrayBuffer(x.data)], {type: mimeType});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    return link;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    const numAllRows = this.resultsLength;
    return numSelected >= numRows;
  }

  toggleShowFilterWrapper(target: boolean = null) {
    const that = this;
    return () => that.toggleShowFilter(target);
  }

  toggleShowFilter(target: boolean = null) {
    this.showFilter = target === null ? !this.showFilter : target;
    console.log(this);
    console.log('toggle, new: ' + this.showFilter);
  }

  selectedCount() {
    return this.selection.selected.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    if (!this.isAllSelected()) {
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
      this.service.get(
        1,
        10000, // TODO: Infinity? (MAX_VALUE)
        [{column: this.sort.active, order: this.sort.direction.toString()}],
        [{column: this.defaultSearchColumn, value: this.searchInput.nativeElement.value}],
        this.searchParamsString
      ).pipe(
        tap(x => {
          if (x['hydra:member']) {
            const indexedData = [];
            this.selection.selected.forEach(entity => {
              indexedData[entity.id] = entity;
            });
            x['hydra:member'].forEach(selectedEntity => {
              if (indexedData[selectedEntity.id]) {
                this.selection.deselect(selectedEntity);
                this.selection.select(indexedData[selectedEntity.id]);
              }
              if (!indexedData[selectedEntity.id]) {
                this.selection.select(selectedEntity);
              }
            });
          }
        })
      ).subscribe();
    }
  }

  unselectAll() {
    this.selection.clear();
  }

  public getProperty(obj, path) {
    return (path.split('.').reduce((o, p) => o && o[p], obj));
  }

  public isSortable(column: string | null): boolean {
    // console.log('Column '+column+' is' + (result ? '' : ' NOT') + ' in array.');
    return null !== column && column.length > 0 && typeof column === 'string' && this.orderColumns[column];
  }

  ngOnInit() {
    this.service.addRefreshCallback(this.loadData, this);
    this.service.setSelectedByRoute(this.route);
  }

  loadData() {
    console.log('ApiEntityList is loading data...');
    const apiSearchColumns = this.searchColumns && this.searchColumns.length > 0 ? this.searchColumns : this.defaultSearchColumn;
    // this.dataSourceMyNew = new ApiEntityDataSource(this.service);
    // this.dataSourceMyNew.loadItems(1);
    // If the app-user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
    this.dataSource.filterPredicate = ApiEntityListComponent.searchFilterPredicate;
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.service.get(
          this.paginator.pageIndex + 1,
          this.paginator.pageSize || this.pageSize,
          [{column: this.sort.active, order: this.sort.direction.toString()}],
          [{column: this.defaultSearchColumn, value: this.searchInput.nativeElement.value}],
          this.searchParamsString
        );
      }),
      map(data => {
        this.isLoadingResults = false;   // Flip flag to show that loading has finished.
        this.isRateLimitReached = false; // console.log(data['hydra:totalItems'] + ', ' + data.length);
        // @ts-ignore
        this.resultsLength = data['hydra:totalItems'] || data.length;
        this.extractOrderColumns(data);
        return data['hydra:member'] || data;
      }),
      catchError(() => {
        console.log('Catch error.');
        this.isLoadingResults = false;
        this.isRateLimitReached = true;  // Catch if the GitHub API has reached its rate limit. Return empty data.
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource.data = this.getDataFromResponse(data);
      const indexedData = [];
      this.dataSource.data.forEach((entity: BasicModel) => {
        indexedData[entity.id] = entity;
      });
      this.selection.selected.forEach(selectedEntity => {
        if (indexedData[selectedEntity.id]) {
          this.selection.deselect(selectedEntity);
          this.selection.select(indexedData[selectedEntity.id]);
        }
      });
    });
  }

  ngAfterViewInit() {
    console.log('Search oldOldInput: ', this.searchInput);
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadData();
        })
      )
      .subscribe();
    this.loadData(); // this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  selectEntity(newEntity: BasicModel) {
    this.service.setSelectedId(newEntity.id);
  }

  selectEntityByRow(entityId: number, event) {
    const redirectPath = '/' + this.getFrontPath() + '/' + entityId;
    this.router.navigate([redirectPath]).then();
  }

  getFrontPath(): string {
    return this.service.getFrontendPath();
  }

  refresh(): void {
    this.loadData();
  }

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    return this.service.getEntityName(grCase, capitalize);
  }

  public getPreSuffix(): string {
    return this.service.getPreSuffix();
  }

  public getBooleanColor(row, col): string {
    return col.subtype === 'reversed' ? !this.getProperty(row, col.name) ? 'green' : 'red' : this.getProperty(row, col.name) ? 'green' : 'red';
  }

  isArray(item: any): boolean {
    return Array.isArray(item);
  }

  public downloadPdfList(urlPath: string, type: string = 'get-list-pdf', fileName: string = 'oswis-download-file.pdf') {
    this.service.downloadPdfList(urlPath, type)
      .pipe(
        tap(x => {
          console.log(x);
          ApiEntityListComponent.getDownloadLink(x, fileName, 'application/pdf').click();
        })
      ).subscribe();
  }

  getAction(action: ListActionModel, extraData: object = null, items: object[] = null): () => void {
    return () => action.dialog ? this.openDialog(action, extraData, items) : action.action(items ? this.selection.selected : items);
  }

  getDialogConfig(action: ListActionModel, extraData: object = null, items: object[] = null): MatDialogConfig {
    return {
      data: {
        items: null === items ? this.selection.selected : items,
        action: action,
        extraData: extraData,
      }
    };
  }

  processDialogResult(context: ApiEntityAbstractComponent, action: ListActionModel, dialogResult, dialogRef): void {
    action.action(
      dialogResult,
      () => {
        context.unselectAll();
        dialogRef.close();
      }
    );
  }

  public isInDateRange(row, col, start?: string, end?: string, dateTime?: string): boolean {
    const date = dateTime ? new Date(dateTime) : new Date();
    const startDate = new Date(start ?? this.getProperty(row, 'startDateTime'));
    const endDate = new Date(end ?? this.getProperty(row, 'endDateTime'));
    if (null !== startDate && date < startDate) {
      return false;
    }
    return !(null !== endDate && date > endDate);
  }

  public getDateRangeColor(row, col, start?: string, end?: string, dateTime?: string): string {
    const isTrue = this.isInDateRange(row, col, start, end, dateTime);
    return (col.subtype === 'reversed') ? (!isTrue ? 'green' : 'red') : (isTrue ? 'green' : 'red');
  }

  public extractOrderColumns(result: JsonLdListResponse<Type>) {
    const that = this;
    const regex = /^order\[(\S+)]$/;
    this.orderColumns = [];

    result["hydra:search"]["hydra:mapping"].forEach(
      function (row: { '@type': string; 'property': string; 'required': boolean; 'variable': string; }) {
        if (row.variable.startsWith('order[')) {
          const regexResult = regex.exec(row.variable);
          if (regexResult[1].length > 0) {
            that.orderColumns[regexResult[1]] = true;
          }
        }
      }
    );
    console.log('Order columns: ', this.orderColumns);
  }

  protected getDataFromResponse(data: any[] | JsonLdListResponse<BasicModel> | BasicModel[]): BasicModel[] {
    if (data instanceof JsonLdListResponse) {
      return data["hydra:member"];
    }
    return data;
  }


}


