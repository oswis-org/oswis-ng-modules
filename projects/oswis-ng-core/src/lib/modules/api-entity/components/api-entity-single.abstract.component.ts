import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {RemoveEntitySingleComponent} from '../dialogs/remove-entity-single.component';
import {ListActionModel} from "../models/list-action.model";
import {ApiEntityAbstractComponent} from "./api-entity.abstract.component";

type Type = object | any;

export abstract class ApiEntitySingleAbstractComponent extends ApiEntityAbstractComponent {

  public selectedEntity$: Observable<Type>;
  public selectedEntityEmpty = false;

  public actionButtons: ListActionModel[] = [];
  public actionLinks: ListActionModel[] = [];

  public refresh(): void {
    this.loadData();
  }

  public loadData() {
    this.selectedEntityEmpty = false;
    console.log(this.selectedEntityEmpty);
    console.log('ApiEntitySingle: Loading entity...');
    this.selectedEntity$ = this.apiEntityService.getSelected().pipe(
      tap(x => {
        this.selectedEntityEmpty = (x.length === 0);
        console.log('ApiEntitySingle: isEmpty?' + this.selectedEntityEmpty);
      }),
      catchError((err, caught) => {
        this.selectedEntityEmpty = true;
        console.log('ApiEntitySingle: isEmpty?' + this.selectedEntityEmpty);
        return new Observable();
      })
    );
  }

  public getEntity(): Observable<Type> {
    return this.selectedEntity$;
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

  getAction(action: ListActionModel, extraData: object = null, items: object[] = null): () => void {
    const that = this;
    return () => {
      if (items && items.length > 0) {
        return action.dialog ? this.openDialog(action, extraData, items) : action.action(items);
      }

      return this.apiEntityService.getSelected().subscribe(
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




