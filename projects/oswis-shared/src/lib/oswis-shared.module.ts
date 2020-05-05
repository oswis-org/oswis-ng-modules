import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ImageCropperModule} from 'ngx-img-cropper';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {WithLoadingPipe} from "./pipes/with-loading.pipe";
import {OswisMaterialModule} from "./oswis-material.module";
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RepeatTypeComponent} from './forms/repeat-section.type';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarShowService} from "./services/sidebar-show.service";
import {GenderInputComponent} from './forms/gender-input.component';
import {TokenStorageService} from "./services/token-storage.service";
import {SimpleSectionTypeComponent} from './forms/simple-section.type';
import {ExampleAppComponent} from "./components/example-app.component";
import {AuthenticationService} from "./services/authentication.service";
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {SimpleWrapperComponent} from './forms/simple-wrapper.component';
import {RefreshTokenInterceptor} from "./interceptors/refresh-token-interceptor";
import {ToggleFullscreenDirective} from "./directives/toggle-fullscreen.directive";
import {MatDatepickerWithTypeComponent} from './forms/mat-datepicker-with-type.component';
import {FormlyImageCropperInputComponent} from './forms/formly-image-cropper-input.component';
import {FormlyFieldSelectSearchComponent} from './forms/formly-field-select-search.component';
import {HomeComponent} from "./components/home.component";
import {HeaderComponent} from "./components/header.component";
import {SidebarComponent} from "./components/sidebar.component";

@NgModule({
  exports: [
    // MatMomentDateModule,
    FormsModule,
    FormlyModule,
    CommonModule,
    RepeatTypeComponent,
    OswisMaterialModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    WithLoadingPipe,
    NgSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ImageCropperModule,
    ReactiveFormsModule,
    ExampleAppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    // MatMomentDateModule,
    CommonModule,
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
        {name: 'gender-oldOldInput', component: GenderInputComponent},
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
    RefreshTokenInterceptor,
  ],
  entryComponents: [
    RepeatTypeComponent,
    SimpleWrapperComponent,
  ],
})
export class OswisSharedModule {
}
