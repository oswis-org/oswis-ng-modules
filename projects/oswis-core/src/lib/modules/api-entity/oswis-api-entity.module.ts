import {NgModule} from '@angular/core';
import {ApiEntityComponent} from './components/api-entity.component';
import {ApiEntityShowComponent} from './components/api-entity-show.component';
import {ApiEntityEditComponent} from './components/api-entity-edit.component';
import {ApiEntityEditorComponent} from './components/api-entity-editor.component';
import {ApiEntityService} from './services/api-entity.service';
import {ApiEntityListComponent} from './components/api-entity-list.component';
import {BasicInfoShowComponent} from './chunks/basic-info-show.component';
import {LoadingShowComponent} from './chunks/loading-show.component';
import {BackToListShowActionComponent} from './chunks/back-to-list-show-action.component';
import {EditShowActionComponent} from './chunks/edit-show-action.component';
import {DeleteShowActionComponent} from './chunks/delete-show-action.component';
import {BasicShowActionsComponent} from './chunks/basic-show-actions.component';
import {NewEntityButtonComponent} from './chunks/new-entity-button.component';
import {BackToShowActionComponent} from './chunks/back-to-show-action.component';
import {RefreshActionComponent} from './chunks/refresh-action.component';
import {CustomListActionButton} from "./chunks/custom-list-action-button.component";
import {CustomActionComponent} from "./chunks/custom-action.component";
import {RemoveEntityDialog} from "./components/remove-entity-dialog.component";
import {OswisSharedModule} from "oswis-shared";
import {RouterModule} from "@angular/router";

@NgModule({
  exports: [
    ApiEntityComponent,
    ApiEntityListComponent,
    ApiEntityShowComponent,
    ApiEntityEditComponent,
    ApiEntityEditorComponent,
    BasicInfoShowComponent,
    LoadingShowComponent,
    BackToListShowActionComponent,
    BackToShowActionComponent,
    EditShowActionComponent,
    DeleteShowActionComponent,
    BasicShowActionsComponent,
    NewEntityButtonComponent,
    RefreshActionComponent,
    CustomListActionButton,
    CustomActionComponent,
    RemoveEntityDialog,
    OswisSharedModule,
  ],
  imports: [
    OswisSharedModule,
    RouterModule,
  ],
  declarations: [
    ApiEntityComponent,
    ApiEntityListComponent,
    ApiEntityShowComponent,
    ApiEntityEditComponent,
    ApiEntityEditorComponent,
    BasicInfoShowComponent,
    LoadingShowComponent,
    BackToListShowActionComponent,
    BackToShowActionComponent,
    EditShowActionComponent,
    DeleteShowActionComponent,
    BasicShowActionsComponent,
    NewEntityButtonComponent,
    RefreshActionComponent,
    CustomListActionButton,
    CustomActionComponent,
    RemoveEntityDialog,
  ],
  providers: [
    ApiEntityService,
  ],
  entryComponents: [
    RemoveEntityDialog,
  ],
})
export class OswisApiEntityModule {
}
