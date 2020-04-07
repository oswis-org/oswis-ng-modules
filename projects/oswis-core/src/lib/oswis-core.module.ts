import {ModuleWithProviders, NgModule} from '@angular/core';
import {OswisConfig} from "../../../oswis-shared/src/lib/config/oswis.config";
import {OSWIS_CONFIG} from "../../../oswis-shared/src/lib/config/oswis.config.token";

@NgModule({
  imports: [],
  providers: [],
  declarations: [],
  exports: [],
})
export class OswisCoreModule {
  // noinspection JSUnusedGlobalSymbols
  static forRoot(oswisConfig: OswisConfig): ModuleWithProviders {
    return {ngModule: OswisCoreModule, providers: [{provide: OSWIS_CONFIG, useValue: oswisConfig,}]};
  }
}
