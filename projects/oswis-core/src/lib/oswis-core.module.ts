import {ModuleWithProviders, NgModule} from '@angular/core';
import {OSWIS_CONFIG, OswisConfig, OswisSharedModule} from "oswis-shared";

@NgModule({
  imports: [OswisSharedModule],
  exports: [OswisSharedModule],
  providers: [],
  declarations: [],
})
export class OswisCoreModule {
  // noinspection JSUnusedGlobalSymbols
  static forRoot(oswisConfig: OswisConfig): ModuleWithProviders {
    return {ngModule: OswisCoreModule, providers: [{provide: OSWIS_CONFIG, useValue: oswisConfig,}]};
  }
}
