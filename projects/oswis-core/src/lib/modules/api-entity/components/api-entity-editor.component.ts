import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ApiEntitySingleAbstractComponent} from "./api-entity-single.abstract.component";
import {ApiEntityService} from "../services/api-entity.service";
import {BasicModel} from "@oswis-org/oswis-shared";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'oswis-api-entity-editor',
  templateUrl: './api-entity-editor.component.html',
})
export class ApiEntityEditorComponent<Type extends BasicModel = BasicModel> extends ApiEntitySingleAbstractComponent<Type> {
  @Input() public model: object = {};
  @Input() public fields: FormlyFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public errorMessage = '';
  @Input() public help = null;
  @Input() public service: ApiEntityService<Type>;

  constructor(route: ActivatedRoute, router: Router, dialog: MatDialog) {
    super(route, router, null, dialog);
  }

  @Input() public transform: (item: object) => object = item => item;

  public refresh(): void {
    this.loadData();
  }

  public loadData(): Observable<Type> {
    this.selectedEntityEmpty = false;
    if (!this.creatingNew()) {
      return this.selectedEntity$ = this.service.getSelected().pipe(
        tap(x => {
          // @ts-ignore
          this.selectedEntityEmpty = (!x || x.length === 0);
          this.form.patchValue(x);
          this.model = x;
        }),
        catchError((err, caught) => {
          this.selectedEntityEmpty = true;
          return new Observable<Type>();
        })
      );
    }
    return this.selectedEntity$ = new Observable<Type>();
  }

  creatingNew(): boolean {
    return this.router.url.indexOf('new') > 0;
  }

  onSubmit() {
    return this.submitForm(this.form.value); // console.log('onSubmit()');
  }

  submit(model) {
    return this.submitForm(this.transform(model)); // console.log('onSubmit()', model);
  }

  submitForm(formValue) {
    // console.log('submitForm(x)');
    this.errorMessage = '';
    if (formValue) {
      // console.log('Will put/patch on server.');
      // console.log(formValue);
      this.service.postOrPut(formValue).pipe(
        tap(newEntity => {
          if (newEntity && newEntity.id && newEntity.id > 0) {
            this.service.setSelectedId(newEntity.id);
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

  public getH1Prefix(): string {
    if (this.creatingNew() || this.selectedEntityEmpty) {
      return 'Nov' + this.getPreSuffix() + ' ' + this.getEntityName(1, false);
    }
    return 'Úprava ' + this.getEntityName(2, false);
  }

  ngOnInit() {
    super.ngOnInit();
    this.service.addSelectedChangedCallback(this.loadData, this);
    this.refresh();
  }
}
