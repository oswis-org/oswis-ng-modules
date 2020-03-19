import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiEntityInterfaceService} from '../api-entity-interface.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {FormlyFieldConfig} from "@ngx-formly/core";

type Type = any;

@Component({
  selector: 'oswis-api-entity-edit',
  template: `
    <oswis-api-entity-editor [apiEntityService]="apiEntityService" [fields]="fields" [help]="help"
                             [transform]="transform" class="entity-card-container">
    </oswis-api-entity-editor>
  `,
})
export class ApiEntityEditComponent implements OnInit {
  public selectedEntityEmpty = false;
  public selectedEntity$: Observable<Type>;

  public fields: FormlyFieldConfig[];
  public help?: string;
  public transform?: (object) => object;

  constructor(protected route: ActivatedRoute, protected router: Router, protected apiEntityService: ApiEntityInterfaceService) {
    this.apiEntityService.addSelectedChangedCallback(this.loadEntity, this);
  }

  ngOnInit() {
    if (this && this.route) {
      this.route.params.subscribe((params: ParamMap) => {
        this.apiEntityService.setSelectedId(params['id'] ? +params['id'] : null);
        console.log('ApiEntityEdit: Entity ' + (params['id'] ? +params['id'] : 'not') + ' selected.');
      });
    }
    this.loadEntity();
  }

  public loadEntity() {
    this.selectedEntityEmpty = false;
    console.log(this.selectedEntityEmpty);
    console.log('Loading entity...');
    this.selectedEntity$ = this.apiEntityService.getSelected().pipe(
      tap(x => {
        this.selectedEntityEmpty = (x.length === 0);
        console.log(this.selectedEntityEmpty);
      }),
      catchError((err, caught) => {
        this.selectedEntityEmpty = true;
        console.log(this.selectedEntityEmpty);
        return new Observable();
      })
    );
  }

  public getEntity(): Observable<Type> {
    return this.selectedEntity$;
  }

  public backToList() {
    this.apiEntityService.setSelectedId();
    this.router.navigate(['/' + this.apiEntityService.getFrontendPath()]).then();
  }
}
