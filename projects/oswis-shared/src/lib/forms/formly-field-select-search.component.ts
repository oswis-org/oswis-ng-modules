import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {FormControl} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oswis-formly-field-select-search',
  template: `
    <mat-form-field>
      <!--suppress AngularInvalidExpressionResultType -->
      <mat-select [placeholder]="to.placeholder" [formControl]="formControl" #singleSelect [required]="to.required">
        <ngx-mat-select-search
          [formControl]="bankFilterCtrl"
          placeholderLabel="Hledat"
          noEntriesFoundLabel="Žádné položky"
          [required]="to.required"
        >
        </ngx-mat-select-search>
        <mat-option *ngFor="let item of options$" [value]="item?.id">
          {{ item?.name || item?.fullName || item?.username || item?.id //noinspection UnresolvedVariable }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class FormlyFieldSelectSearchComponent extends FieldType implements AfterViewInit {
  public bankFilterCtrl: FormControl = new FormControl();
  @ViewChild('singleSelect', {read: MatSelect}) singleSelect: MatSelect;

  options$: any[];
  persistentEntity: any;
  originalEntity: any;
  loaded = false;

  static compareWith(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  ngAfterViewInit(): void {
    this.to.search$(null, this.model ? this.model.id : null)
      .pipe(
        tap(
          x => {
            this.originalEntity = ['hydra:member'] ? null : x;
            this.options$ = [this.originalEntity];
            this.loaded = true;
            this.search();
          }
        )
      )
      .subscribe();

    this.bankFilterCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(
          x => {
            this.search();
          }
        )
      )
      .subscribe();

    this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(
          x => {
            this.to.search$(null, this.model.id)
              .pipe(
                tap(
                  y => {
                    this.persistentEntity = y;
                    this.options$.push(y);
                    this.loaded = true;
                    this.search();
                  }
                )
              )
              .subscribe();
          }
        )
      )
      .subscribe();
  }

  search() {
    this.to.search$(this.bankFilterCtrl.value)
      .pipe(
        tap(
          x => {
            this.options$ = x['hydra:member'];
            if (this.originalEntity) {
              this.options$.push(this.originalEntity);
            }
            if (this.persistentEntity) {
              this.options$.push(this.persistentEntity);
            }
            this.loaded = true;
            this.removeOptionsDuplicates();
          }
        )
      )
      .subscribe();
  }

  removeOptionsDuplicates() {
    console.log('removing duplicates');
    console.log(this.options$);
    this.options$ = this.options$.filter((obj, index) => {
      return (this.options$.map(obj2 => obj2['id']).indexOf(obj['id']) === index);
    });
    this.options$ = this.options$.filter((obj, index) => {
      return obj && obj.id !== 0;
    });
  }

}
