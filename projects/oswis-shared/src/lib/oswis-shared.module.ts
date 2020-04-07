import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepeatTypeComponent} from './forms/repeat-section.type';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {FormlyModule} from '@ngx-formly/core';
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
import {RouterModule} from '@angular/router';
import {WithLoadingPipe} from "./pipes/with-loading.pipe";
import {OswisMaterialModule} from "./oswis-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarShowService} from "./services/sidebar-show.service";
import {AuthenticationService} from "./services/authentication.service";
import {TokenStorageService} from "./services/token-storage.service";
import {ExampleAppComponent} from "./components/example-app.component";
import {HomeComponent} from "./components/home.component";
import {HeaderComponent} from "./components/header.component";
import {SidebarComponent} from "./components/sidebar.component";
import {ToggleFullscreenDirective} from "./directives/toggle-fullscreen.directive";

@NgModule({
  exports: [
    RepeatTypeComponent,
    OswisMaterialModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyModule,
    WithLoadingPipe,
    NgSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgxMatSelectSearchModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    ExampleAppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    OswisMaterialModule,
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
  ],
  declarations: [
    RepeatTypeComponent,
    SimpleSectionTypeComponent,
    SimpleWrapperComponent,
    FormlyFieldSelectSearchComponent,
    MatDatepickerWithTypeComponent,
    FormlyImageCropperInputComponent,
    GenderInputComponent,
    WithLoadingPipe,
    ExampleAppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
  ],
  providers: [
    WithLoadingPipe,
    SidebarShowService,
    AuthenticationService,
    TokenStorageService,
  ],
  entryComponents: [
    RepeatTypeComponent,
    SimpleWrapperComponent,
  ],
})
export class OswisSharedModule {
}
