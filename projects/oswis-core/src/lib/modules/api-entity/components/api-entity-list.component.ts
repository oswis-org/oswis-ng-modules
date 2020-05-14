import {fromEvent, Observable} from 'rxjs';
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
import {JsonLdListResponseModel} from "../models/json-ld-list-response.model";
import {BasicModel} from "@oswis-org/oswis-shared";
import {JsonLdHydraMappingModel} from "../models/json-ld-hydra-mapping.model";
import {ListFilterModel} from "../models/list-filter.model";
import {KeyValue} from "@angular/common";
import {ListFilterDialogComponent} from "./list-filter-dialog.component";

@Component({
  selector: 'oswis-api-entity-list',
  templateUrl: './api-entity-list.component.html',
})
export class ApiEntityListComponent<Type extends BasicModel = BasicModel> extends ApiEntityAbstractComponent<Type> implements AfterViewInit {
  public readonly F_DATE = 'd.M.y';
  public readonly F_DATE_TIME = 'd.M.y HH:mm';

  @Input() public service: ApiEntityService<Type>;
  @Input() displayedColumns: string[];
  @Input() availableColumns: ColumnDefinitionModel[];
  @Input() fulltextSearchColumn = 'search';
  @Input() fulltextSearchValue: string;
  @Input() defaultPageSize = 10;
  @Input() searchParamsString = '';

  // noinspection JSUnusedGlobalSymbols
  public hydraMappings: JsonLdHydraMappingModel[] = [];
  public orderColumns: boolean[] = [];
  public availableFilters: ListFilterModel<ApiEntityService<Type>>[] = [];
  public activeFilters: KeyValue<string, string | number | boolean | null>[] = [];

  //Buttons - START
  @Input() actionSingleButtons: ListActionModel[] = [];
  @Input() actionSingleLinks: ListActionModel[] = [];
  @Input() actionMultipleMenuItems: ListActionModel[] = [];
  @Input() actionGlobalButtons: ListActionModel[] = [];
  @Input() actionStaticButtons: ListActionModel[] = [
    {
      name: 'Filtry',
      icon: 'filter_list',
      action: () => this.loadData(),
      badge: this.getFiltersLengthAsString(),
      data: {availableFilters: this.availableFilters, activeFilters: this.activeFilters,},
      dialog: ListFilterDialogComponent,
    },
  ];
  //Buttons - END

  resultsLength = 0;
  isLoadingResults = true;
  isApiError = false;
  dataSource = new MatTableDataSource<Type>();
  selection = new SelectionModel<Type>(true, []);

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

  public getFiltersLengthAsString(): () => string | null {
    const that = this;
    return () => that.getFilters().length > 0 ? '' + that.getFilters().length : null;
  }

  public getFilters(): KeyValue<string, string | number | boolean | null>[] {
    return this.activeFilters.map((filter: KeyValue<string, string | number | boolean | null>) => filter);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected >= numRows;
  }

  selectedCount() {
    return this.selection.selected.length;
  }

  masterToggle() {
    const context = this;
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.dataSource.filteredData.forEach(row => context.selection.select(row));
    this
      .loadDataFromApi(1, 999999)
      .pipe(tap((data: JsonLdListResponseModel<Type>) => {
        return this.fixSelectionAfterUpdate(data);
      }))
      .subscribe();
  }

  unselectAll() {
    this.selection.clear();
  }

  public getProperty(obj, path) {
    return (path.split('.').reduce((o, p) => o && o[p], obj));
  }

  public isSortable(column: string | null): boolean {
    return null !== column && column.length > 0 && typeof column === 'string' && this.orderColumns[column];
  }

  ngOnInit() {
    this.service.addRefreshCallback(this.loadData, this);
    this.service.setSelectedByRoute(this.route);
  }

  loadData() {
    console.log('ApiEntityList is loading data...');
    this.sort.sortChange.subscribe(() => this.setPageNumber());
    this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
    this.dataSource.filterPredicate = ApiEntityListComponent.searchFilterPredicate;
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => this.loadDataFromApi()),
      map((data: JsonLdListResponseModel<Type>) => this.processReceivedData(data)),
      catchError((x: any) => this.processApiError(x))
    ).subscribe((data: Type[]) => this.fillDataSource(data))
  }

  public getPageSize(): number {
    return this.paginator.pageSize ?? this.defaultPageSize;
  }

  public getPageNumber(): number {
    return this.paginator.pageIndex;
  }

  public setPageNumber(newPage: number = 0): number {
    return this.paginator.pageIndex = newPage;
  }

  // noinspection JSUnusedGlobalSymbols
  public affectPageNumber(shift: number): number {
    return this.paginator.pageIndex += shift;
  }

  ngAfterViewInit() {
    console.log('Search oldOldInput: ', this.searchInput);
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        tap(() => {
          this.setPageNumber(0)
          this.loadData();
        })
      )
      .subscribe();
    this.loadData(); // this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort;
  }

  // noinspection JSUnusedGlobalSymbols
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  selectEntity(newEntity: Type) {
    this.service.setSelectedId(newEntity.id);
  }

  selectEntityByRow(entityId: number) {
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

  // noinspection JSUnusedGlobalSymbols
  public downloadPdfList(urlPath: string, type: string = 'getCollection-list-pdf', fileName: string = 'oswis-download-file.pdf') {
    this.service.downloadPdfList(urlPath, type)
      .pipe(
        tap(x => {
          ApiEntityService.getDownloadLink(x, fileName, 'application/pdf').click();
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

  public extractOrderAndFilterColumns(result: JsonLdListResponseModel<Type>) {
    this.orderColumns = [];
    result["hydra:search"]["hydra:mapping"].forEach((row) => this.extractOrderColumnsProcessRow(row));
    console.log('Order columns: ', this.orderColumns);
    console.log('Available filter columns: ', this.availableFilters);
  }

  public addAvailableFilter(filter: ListFilterModel): void {
    let titlePrefix = null, titleSuffix = null;
    filter.inputType = 'text';

    if ('exists' == filter.type) {
      filter.inputType = 'boolean';
      titleSuffix = ' existuje ';
    }
    if ('fulltext' == filter.type) {
      filter.inputType = 'text';
      filter.title = 'Fulltextové vyhledávání';
    }
    if (['lt', 'lte', 'gt', 'gte'].includes(filter.type)) {
      filter.inputType = 'number';
      titleSuffix = 'lt' == filter.type ? ' < ' : '';
      titleSuffix += 'lte' == filter.type ? ' <= ' : '';
      titleSuffix += 'gt' == filter.type ? ' > ' : '';
      titleSuffix += 'gte' == filter.type ? ' >= ' : '';
    }
    if ('between' == filter.type) {
      filter.inputType = 'number';
      titleSuffix = ' je mezi ';
    }
    if (['before', 'strictly_before', 'after', 'strictly_after'].includes(filter.type)) {
      filter.inputType = 'datetime';
      titleSuffix = 'before' == filter.type ? ' < ' : '';
      titleSuffix += 'strictly_before' == filter.type ? ' <= ' : '';
      titleSuffix += 'after' == filter.type ? ' > ' : '';
      titleSuffix += 'strictly_after' == filter.type ? ' >= ' : '';
    }
    if (!filter.title) {
      filter.title = titlePrefix;
      filter.title += (this.availableColumns.filter((val: ColumnDefinitionModel) => val.name == filter.column).map((val: ColumnDefinitionModel) => val.title)[0] ?? filter.column);
      filter.title += titleSuffix;
    }
    this.availableFilters[filter.key] = filter;
  }

  // noinspection JSUnusedGlobalSymbols
  public getActiveFilters(): KeyValue<string, string | number | boolean | null>[] {
    return this.activeFilters;
  }

  // noinspection JSUnusedGlobalSymbols
  public addActiveFilter(filter: KeyValue<string, string | number | boolean | null>): void {
    this.activeFilters[filter.key] = filter.value;
  }

  // noinspection JSUnusedGlobalSymbols
  public removeActiveFilter(key: string): void {
    this.activeFilters[key] = null;
    delete this.activeFilters[key];
  }

  public getDataFromResponse(data: JsonLdListResponseModel<Type> | Type[]): Type[] {
    return data["hydra:member"] ?? data;
  }

  protected extractOrderColumnsProcessRow(
    row: { '@type': string; 'property': string; 'required': boolean; 'variable': string; },
    context: ApiEntityListComponent = this,
  ): void {
    const regexResult = /^([a-zA-Z.]+)(\[(\S*)])*$/.exec(row.variable);
    const first = regexResult[1] ?? null;
    const second = regexResult[2] ?? null;

    switch (first) {
      case 'order':
        if (second.length > 0) {
          context.orderColumns[row.property] = true;
        }
        break;
      case 'exists':
        if (second.length > 0) {
          this.addAvailableFilter({key: row.variable, type: 'exists', column: row.property});
        }
        break;
      case this.fulltextSearchColumn:
        this.addAvailableFilter({key: row.variable, type: 'fulltext', column: row.property});
        break;
      default:
        this.addAvailableFilter({key: row.variable, type: second, column: row.property});
        break;
    }
  }

  protected fillDataSource(data: JsonLdListResponseModel<Type> | Type[]): void {
    this.dataSource.data = this.getDataFromResponse(data);
    console.log('New data: ', this.dataSource.data);
    this.fixSelectionAfterLoad();
  }

  protected fixSelection(dataArray: Type[]): void {
    const indexedData = [];
    this.dataSource.data.forEach((entity: Type) => {
      indexedData[entity.id] = entity;
    });
    dataArray.forEach(selectedEntity => {
      if (indexedData[selectedEntity.id]) {
        this.selection.deselect(selectedEntity);
        this.selection.select(indexedData[selectedEntity.id]);
      }
      if (!indexedData[selectedEntity.id]) {
        this.selection.select(selectedEntity);
      }
    });
  }

  protected fixSelectionAfterUpdate(dataArray: JsonLdListResponseModel<Type>): () => void {
    return () => {
      return this.fixSelection(dataArray['hydra:member'])
    };
  }

  protected fixSelectionAfterLoad(): () => void {
    return () => {
      return this.fixSelection(this.selection.selected)
    };
  }

  protected processApiError(error?: any): Observable<any[]> {
    console.error(error);
    this.isLoadingResults = false;
    this.isApiError = true;  // Catch if the GitHub API has reached its rate limit. Return empty data.
    return observableOf([]);
  }

  protected processReceivedData(data: JsonLdListResponseModel<Type>): Type[] {
    this.isLoadingResults = false;   // Flip flag to show that loading has finished.
    this.isApiError = false; // console.log(data['hydra:totalItems'] + ', ' + data.length);
    this.resultsLength = data['hydra:totalItems'];
    this.extractOrderAndFilterColumns(data);
    return this.getDataFromResponse(data);
  }

  protected loadDataFromApi(page?: number, perPage?: number): Observable<JsonLdListResponseModel<Type>> {
    this.isLoadingResults = true;
    return this.service.getCollection(
      page ?? this.getPageNumber() + 1,
      perPage ?? this.getPageSize(),
      [{key: this.sort.active, value: this.sort.direction.toString()}],
      [{key: this.fulltextSearchColumn, value: this.searchInput.nativeElement.value}, ...this.activeFilters],
      this.searchParamsString
    );
  }
}

