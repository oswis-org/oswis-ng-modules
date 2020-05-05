import {Directive} from "@angular/core";
import {BasicModel} from "@oswis-org/oswis-shared";
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ListActionModel} from "../models/list-action.model";
import {ApiEntityService} from "../services/api-entity.service";
import {RemoveEntityDialog} from "./remove-entity-dialog.component";
import {ApiEntityAbstractComponent} from "./api-entity.abstract.component";

@Directive()
export abstract class ApiEntitySingleAbstractComponent<Type extends BasicModel = BasicModel> extends ApiEntityAbstractComponent<Type> {
  public selectedEntity$: Observable<Type>;
  public selectedEntityEmpty = false;

  public actionButtons: ListActionModel[] = [];
  public actionLinks: ListActionModel[] = [];

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(route: ActivatedRoute, router: Router, service: ApiEntityService<Type>, dialog: MatDialog) {
    super(route, router, service, dialog);
  }

  public refresh(): void {
    this.loadData();
  }

  public loadData() {
    this.selectedEntityEmpty = false;
    console.log(this.selectedEntityEmpty);
    console.log('ApiEntitySingle: Loading entity...');
    this.selectedEntity$ = <Observable<Type>>this.service.getSelected().pipe<Type>(
      tap((x: Type) => {
        // @ts-ignore
        this.selectedEntityEmpty = (!x || x.length === 0);
        console.log('ApiEntitySingle: isEmpty?' + this.selectedEntityEmpty);
      }),
      /*
      catchError((err, caught) => {
        this.selectedEntityEmpty = true;
        console.log('ApiEntitySingle: isEmpty?' + this.selectedEntityEmpty);
        return new Observable<Type>();
      })*/
    );
  }

  public getEntity(): Observable<Type> {
    return <Observable<Type>>this.selectedEntity$;
  }

  public deleteEntity(id: number, name: string): void {
    const dialogRef = this.dialog.open(RemoveEntityDialog, {data: {id: id, name: name}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteById(id).subscribe(
          (data: any) => {
            this.service.setSelectedId();
            this.router.navigate(['/' + this.service.getFrontendPath()]).then();
          }
        );
      }
    });
  }

  getAction(action: ListActionModel, extraData: object = null, items: object[] = null): () => void {
    const that = this;
    return () => {
      if (items && items.length > 0) {
        return action.dialog ? this.openDialog(action, extraData, items) : action.action(items);
      }

      return this.service.getSelected().subscribe(
        (item: any) => {
          return action.dialog ? this.openDialog(action, extraData, [item]) : action.action([item]);
        }
      );
    };
  }

  processDialogResult(context: ApiEntitySingleAbstractComponent, action: ListActionModel, dialogResult, dialogRef): void {
    action.action(
      dialogResult,
      () => {
        context.loadData();
        dialogRef.close();
      }
    );
  }
}




