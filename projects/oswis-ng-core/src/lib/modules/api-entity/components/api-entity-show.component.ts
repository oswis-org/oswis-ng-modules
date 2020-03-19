import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ApiEntityInterfaceService} from '../api-entity-interface.service';
import {catchError, tap} from 'rxjs/operators';
import {RemoveEntitySingleComponent} from '../dialogs/remove-entity-single.component';
import {MatDialog} from '@angular/material/dialog';

type Type = any;

@Component({
  selector: 'oswis-api-entity-show',
  templateUrl: './api-entity-show.component.html',
})
export class ApiEntityShowComponent implements OnInit {
  public selectedEntity$: Observable<Type>;
  public selectedEntityEmpty = false;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected apiEntityService: ApiEntityInterfaceService,
    protected dialog: MatDialog,
  ) {
    this.apiEntityService.addSelectedChangedCallback(this.loadEntity, this);
  }

  public static notEmptyNotes(input: any[]): any[] {
    const isNotEmpty = (element) => {
      return element.content && element.content.length > 0
    };
    return input.filter(isNotEmpty);
  }


  public static textParagraphOrNullField(title ?: string, value?: string): string {
    return value ? ('<p *ngIf="value"><strong>' + (title ? title + ': ' : null) + '</strong> value </p>') : null;
  }

  static downloadVCard(data: any) {
    const blob = new Blob([data], {type: 'text/vcard'});
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  public notEmptyNotes(input: any[]): any[] {
    return ApiEntityShowComponent.notEmptyNotes(input);
  }

  ngOnInit() {
    if (this && this.route) {
      this.route.params.subscribe((params: ParamMap) => {
        this.apiEntityService.setSelectedId(params['id'] ? +params['id'] : null);
        console.log('ApiEntityShow: Entity ' + (params['id'] ? +params['id'] : 'not') + ' selected.');
      });
    }
    this.loadEntity();
  }

  public getUnnamedTitle(): string {
    // noinspection SpellCheckingInspection
    return 'Nepojmenovan' + this.getPreSuffix() + ' ' + this.getEntityName(1, false);
  }

  public backToShow(): void {
    this.refresh();
  }

  public refresh(): void {
    this.loadEntity();
  }

  public loadEntity() {
    this.selectedEntityEmpty = false;
    console.log(this.selectedEntityEmpty);
    console.log('ApiEntityShow: Loading entity...');
    this.selectedEntity$ = this.apiEntityService.getSelected().pipe(
      tap(x => {
        this.selectedEntityEmpty = (x.length === 0);
        console.log('ApiEntityShow: isEmpty?' + this.selectedEntityEmpty);
      }),
      catchError((err, caught) => {
        this.selectedEntityEmpty = true;
        console.log('ApiEntityShow: isEmpty?' + this.selectedEntityEmpty);
        return new Observable();
      })
    );
  }

  public getEntity(): Observable<Type> {
    return this.selectedEntity$;
  }

  public edit(): void {
    this.router.navigate(['./edit'], {relativeTo: this.route}).then();
  }

  public backToList() {
    this.apiEntityService.setSelectedId();
    this.router.navigate(['/' + this.apiEntityService.getFrontendPath()]).then();
  }

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    return this.apiEntityService.getEntityName(grCase, capitalize);
  }

  public getPreSuffix(): string {
    return this.apiEntityService.getPreSuffix();
  }

  public deleteEntity(id: number, name: string): void {
    const dialogRef = this.dialog.open(RemoveEntitySingleComponent, {
      data: {id: id, name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiEntityService.deleteById(id).subscribe(
          (data: any) => {
            this.apiEntityService.setSelectedId();
            this.router.navigate(['/' + this.apiEntityService.getFrontendPath()]).then();
          }
        );
      }
    });
  }

  getApiUrl(): string {
    return this.apiEntityService.getApiUrl();
  }
}




