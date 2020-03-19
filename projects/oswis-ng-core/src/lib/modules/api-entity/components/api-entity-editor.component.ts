import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiEntityInterfaceService} from '../api-entity-interface.service';
import {MatDialog} from '@angular/material/dialog';
import {RemoveEntitySingleComponent} from '../dialogs/remove-entity-single.component';
import {FormlyFieldConfig} from '@ngx-formly/core';

// type Type = any;

@Component({
  selector: 'oswis-api-entity-editor',
  templateUrl: './api-entity-editor.component.html',
})
export class ApiEntityEditorComponent implements OnInit {
  public selectedEntityEmpty = false;
  public selectedEntity$: Observable<object>;
  @Input() public model: object = {};
  @Input() public fields: FormlyFieldConfig[];
  public form: FormGroup;
  public errorMessage = '';
  @Input() public help = null;
  @Input() public transform: (object) => object;
  @Input() public apiEntityService: ApiEntityInterfaceService;

  constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog) {
    this.form = new FormGroup({});
    this.apiEntityService.addSelectedChangedCallback(this.refresh, this);
  }

  public loadEntity(): Observable<object> {
    this.selectedEntityEmpty = false;
    if (!this.creatingNew()) {
      return this.selectedEntity$ = this.apiEntityService.getSelected().pipe(
        tap(x => {
          this.selectedEntityEmpty = (x.length === 0);
          this.form.patchValue(x);
          this.model = x;
        }),
        catchError((err, caught) => {
          this.selectedEntityEmpty = true;
          return new Observable();
        })
      );
    }
    return this.selectedEntity$ = new Observable<object>();
  }

  ngOnInit() {
    this.loadEntity();
  }

  creatingNew(): boolean {
    return this.router.url.indexOf('new') > 0;
  }

  onSubmit() {
    // console.log('onSubmit()');
    return this.submitForm(this.form.value);
  }

  submit(model) {
    // console.log('onSubmit()');
    // console.log(model);
    const transformedModel = this.transform(model);
    // console.log(model);
    return this.submitForm(model);
  }

  submitForm(formValue) {
    // console.log('submitForm(x)');
    this.errorMessage = '';
    if (formValue) {
      // console.log('Will put/patch on server.');
      // console.log(formValue);
      this.apiEntityService.postOrPut(formValue).pipe(
        tap(newEntity => {
          if (newEntity && newEntity.id && newEntity.id > 0) {
            this.apiEntityService.setSelectedId(newEntity.id);
            this.backToShow();
          }
        }),
        catchError((err, caught) => {
          this.errorMessage = 'Nastala chyba při ukládání.';
          return new Observable();
        })
      ).subscribe();
    } else {
      // console.warn('Nothing to do!');
    }
  }

  refresh() {
    this.loadEntity();
  }

  public backToList(): void {
    this.apiEntityService.setSelectedId();
    this.router.navigate(['/' + this.apiEntityService.getFrontendPath()]).then();
  }

  backToShow() {
    this.router
      .navigate(['/' + this.apiEntityService.getFrontendPath() + '/' + this.apiEntityService.getSelectedId()])
      .then();
  }

  public deleteEntity(id: number, name: string): void {
    this.dialog
      .open(RemoveEntitySingleComponent, {data: {id: id, name: name}})
      .afterClosed()
      .subscribe(result => {
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

  public getEntityName(grCase: number = 1, capitalize: boolean = true): string {
    return this.apiEntityService.getEntityName(grCase, capitalize);
  }

  public getPreSuffix(): string {
    return this.apiEntityService.getPreSuffix();
  }

  public getH1Prefix(): string {
    if (this.creatingNew() || this.selectedEntityEmpty) {
      return 'Nov' + this.getPreSuffix() + ' ' + this.getEntityName(1, false);
    }
    return 'Úprava ' + this.getEntityName(2, false);
  }

  // protected transform(model) {
  //   return model;
  // }

}
