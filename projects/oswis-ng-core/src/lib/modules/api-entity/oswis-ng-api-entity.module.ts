import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiEntityComponent} from './components/api-entity.component';
import {ApiEntityShowComponent} from './components/api-entity-show.component';
import {ApiEntityEditComponent} from './components/api-entity-edit.component';
import {ApiEntityEditorComponent} from './components/api-entity-editor.component';
import {RemoveEntitySingleComponent} from './dialogs/remove-entity-single.component';
import {RepeatTypeComponent} from './forms/repeat-section.type';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ApiEntityService} from './api-entity.service';
import {SimpleWrapperComponent} from './forms/simple-wrapper.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyFieldSelectSearchComponent} from './forms/formly-field-select-search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatDatepickerWithTypeComponent} from './forms/mat-datepicker-with-type.component';
import {FormlyImageCropperInputComponent} from './forms/formly-image-cropper-input.component';
import {ImageCropperModule} from 'ngx-img-cropper';
import {GenderInputComponent} from './forms/gender-input.component';
import {SimpleSectionTypeComponent} from './forms/simple-section.type';
import {ApiEntityListComponent} from './components/api-entity-list.component';
import {RouterModule} from '@angular/router';
import {BasicInfoShowComponent} from './chunks/basic-info-show/basic-info-show.component';
import {LoadingShowComponent} from './chunks/loading-show.component';
import {BackToListShowActionComponent} from './chunks/back-to-list-show-action.component';
import {EditShowActionComponent} from './chunks/edit-show-action.component';
import {DeleteShowActionComponent} from './chunks/delete-show-action.component';
import {BasicShowActionsComponent} from './chunks/basic-show-actions.component';
import {NewEntityButtonComponent} from './chunks/new-entity-button.component';
import {BackToShowActionComponent} from './chunks/back-to-show-action.component';
import {RefreshActionComponent} from './chunks/refresh-action.component';
import {OswisNgMaterialModule} from 'oswis-ng-material';
import {CustomListActionButton} from "./chunks/list-action-buttons.component";
import {CustomActionComponent} from "./chunks/custom-action.component";
import {WithLoadingPipe} from "./pipes/with-loading.pipe";

@NgModule({
  exports: [
    ApiEntityComponent,
    ApiEntityListComponent,
    ApiEntityShowComponent,
    ApiEntityEditComponent,
    ApiEntityEditorComponent,
    RepeatTypeComponent,
    FormsModule,
    ReactiveFormsModule,
    OswisNgMaterialModule,
    LayoutModule,
    FlexLayoutModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyModule,
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
    WithLoadingPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    OswisNgMaterialModule,
    LayoutModule,
    FlexLayoutModule,
    CommonModule,
    NgSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ImageCropperModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyModule.forRoot({
      types: [
        {name: 'repeat', component: RepeatTypeComponent},
        {name: 'simple', component: SimpleSectionTypeComponent},
        {name: 'typeahead', component: FormlyFieldSelectSearchComponent},
        {name: 'image-cropper', component: FormlyImageCropperInputComponent},
        {name: 'gender-input', component: GenderInputComponent},
        {
          name: 'datepicker-with-type',
          component: MatDatepickerWithTypeComponent,
          // wrappers: ['form-field'],
          defaultOptions: {
            defaultValue: new Date(),
            templateOptions: {
              datepickerOptions: {},
            },
          },
        },
      ],
      wrappers: [
        {name: 'simple', component: SimpleWrapperComponent},
      ],
    }),
    RouterModule,
    OswisNgMaterialModule,
    OswisNgMaterialModule,
    OswisNgMaterialModule,
  ],
  declarations: [
    ApiEntityComponent,
    ApiEntityListComponent,
    ApiEntityShowComponent,
    ApiEntityEditComponent,
    ApiEntityEditorComponent,
    RemoveEntitySingleComponent,
    RepeatTypeComponent,
    SimpleSectionTypeComponent,
    SimpleWrapperComponent,
    FormlyFieldSelectSearchComponent,
    MatDatepickerWithTypeComponent,
    FormlyImageCropperInputComponent,
    GenderInputComponent,
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
    WithLoadingPipe,
  ],
  providers: [
    ApiEntityService,
    WithLoadingPipe,
  ],
  entryComponents: [
    RemoveEntitySingleComponent,
    RepeatTypeComponent,
    SimpleWrapperComponent,
  ],
})
export class OswisNgApiEntityModule {
}
