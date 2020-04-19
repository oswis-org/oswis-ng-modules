import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {
  AppErrorHandler,
  AuthGuard,
  getCzechPaginatorIntl,
  MyMomentDateAdapterService,
  OSWIS_CONFIG,
  OswisConfig,
  OswisSharedModule,
  RefreshTokenInterceptor
} from "@oswis-org/oswis-shared";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "@auth0/angular-jwt";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OswisSharedModule,
  ],
  exports: [OswisSharedModule],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    AuthGuard,
    {provide: MatPaginatorIntl, useValue: getCzechPaginatorIntl()},
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    {provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'cs'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MyMomentDateAdapterService},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  ],
  declarations: [],
})
export class OswisCoreModule {
  // noinspection JSUnusedGlobalSymbols
  static forRoot(oswisConfig: OswisConfig): ModuleWithProviders {
    return {ngModule: OswisCoreModule, providers: [{provide: OSWIS_CONFIG, useValue: oswisConfig,}]};
  }
}
