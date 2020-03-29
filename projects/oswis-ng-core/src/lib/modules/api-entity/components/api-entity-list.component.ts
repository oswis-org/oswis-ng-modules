import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {SelectionModel} from '@angular/cdk/collections';
import {ApiEntityInterfaceService} from '../api-entity-interface.service';
import {fromEvent} from 'rxjs';
import {ApiEntityListTypeEnum} from '../enums/api-entity-list-type.enum';
import {ApiEntityListAlignEnum} from '../enums/api-entity-list-align.enum';
import {ListActionModel} from '../models/list-action.model';
import {ColumnDefinitionModel} from '../models/column-definition.model';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

type Type = any;

@Component({
  selector: 'oswis-api-entity-list',
  templateUrl: './api-entity-list.component.html',
})
export class ApiEntityListComponent implements OnInit, AfterViewInit {
  ApiEntityListTypeEnum = ApiEntityListTypeEnum;
  ApiEntityListAlignEnum = ApiEntityListAlignEnum;

  @Input() displayedColumns: string[];
  @Input() columnDefs: ColumnDefinitionModel[];

  @Input() searchValue: string;
  @Input() public apiEntityService: ApiEntityInterfaceService;
  @Input() operationsSingle: ListActionModel[] = [];
  @Input() operationsMultiple: ListActionModel[] = [];
  @Input() operationsGlobal: ListActionModel[] = [];
  @Input() operationsStatic: ListActionModel[] = [
    {name: 'Filtry', icon: 'filter_list', action: this.toggleShowFilterWrapper()}
  ];
  @Input() pageSize = 10;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  public showFilter = false;
  dataSource = new MatTableDataSource<object>();
  selection = new SelectionModel<Type>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchInput', {read: ElementRef, static: true}) searchInput: ElementRef;
  @Input() protected defaultSearchColumn = 'search';
  @Input() protected searchColumns: string[];
  @Input() protected searchParamsString = '';

  // @ViewChild('filter', {read: ElementRef, static: true}) filter: ElementRef;

  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected route: ActivatedRoute,
    protected dialog: MatDialog,
  ) {
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
    } else {
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
      this.apiEntityService.get(
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
              } else {
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

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      this.apiEntityService.setSelectedId(params['id'] ? +params['id'] : null);
      console.log('Entity ' + params['id'] ? +params['id'] : 'not' + ' selected.');
    });
    this.apiEntityService.addRefreshCallback(this.loadData, this);
  }

  loadData() {
    console.log('Will load data.');
    const apiSearchColumns = this.searchColumns && this.searchColumns.length > 0 ? this.searchColumns : this.defaultSearchColumn;
    // this.dataSourceMyNew = new ApiEntityDataSource(this.apiEntityService);
    // this.dataSourceMyNew.loadItems(1);
    // If the app-user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
    this.dataSource.filterPredicate = ApiEntityListComponent.searchFilterPredicate;
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.apiEntityService.get(
          this.paginator.pageIndex + 1,
          this.paginator.pageSize || this.pageSize,
          [{column: this.sort.active, order: this.sort.direction.toString()}],
          [{column: this.defaultSearchColumn, value: this.searchInput.nativeElement.value}],
          this.searchParamsString
        );
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        // console.log(data['hydra:totalItems'] + ', ' + data.length);
        this.resultsLength = data['hydra:totalItems'] || data.length;
        return data['hydra:member'] || data;
      }),
      catchError(() => {
        console.log('Catch error.');
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource.data = data;
      const indexedData = [];
      data.forEach(entity => {
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
    console.log('Search input: ');
    console.log(this.searchInput);
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
    this.loadData();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  selectEntity(newEntity: Type) {
    this.apiEntityService.setSelectedId(newEntity.id);
  }

  selectEntityByRow(entityId: number, event) {
    const redirectPath = '/' + this.getFrontPath() + '/' + entityId; // console.log('Router: ' + redirectPath);
    this.router.navigate([redirectPath]).then(); // console.log('Selected Entity: ' + entityId + ', ' + event);
  }

  getFrontPath(): string {
    return this.apiEntityService.getFrontendPath();
  }

  refresh(): void {
    this.loadData();
  }

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    return this.apiEntityService.getEntityName(grCase, capitalize);
  }

  public getPreSuffix(): string {
    return this.apiEntityService.getPreSuffix();
  }

  public getBooleanColor(row, col): string {
    return col.subtype === 'reversed' ? !this.getProperty(row, col.name) ? 'green' : 'red' : this.getProperty(row, col.name) ? 'green' : 'red';
  }

  isArray(item: any): boolean {
    return Array.isArray(item);
  }

  public downloadPdfList(urlPath: string, type: string = 'get-list-pdf', fileName: string = 'oswis-download-file.pdf',) {
    this.apiEntityService.downloadPdfList(urlPath, type)
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

  processDialogResult(context: ApiEntityListComponent, action: ListActionModel, dialogResult, dialogRef): void {
    action.action(
      dialogResult,
      () => {
        context.unselectAll();
        dialogRef.close();
      }
    );
  }

  openDialog(action: ListActionModel, extraData: object = null, items: object[] = null): void {
    const that = this;
    const dialogRef = that.dialog.open(action.dialog, this.getDialogConfig(action, extraData, items));
    dialogRef.beforeClosed().subscribe(dialogResult => this.processDialogResult(that, action, dialogResult, dialogRef));
  }

}
