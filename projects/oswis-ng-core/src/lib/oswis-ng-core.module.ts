import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MenuService} from "./services/menu.service";
import {SidebarShowService} from "./services/sidebar-show.service";
import {ToggleFullscreenDirective} from "./directives/toggle-fullscreen.directive";
import {SidenavShowDirective} from "./directives/sidenav-show.directive";
import {HomeComponent} from "./components/home/home.component";
import {HeaderComponent} from "./components/header/header.component";
import {PrimarySidebarComponent} from "./components/primary-sidebar/primary-sidebar.component";
import {SecondarySidebarComponent} from "./components/secondary-sidebar/secondary-sidebar.component";
import {OswisNgMaterialModule} from "oswis-ng-material";
import {OswisNgAuthModule} from "./modules/auth/oswis-ng-auth.module";
import {OswisCoreConfig} from "./config/oswis-core.config";
import {OSWIS_CORE_CONFIG} from "./config/oswis-core.config.token";

@NgModule({
  imports: [
    CommonModule,
    OswisNgMaterialModule,
    RouterModule,
    OswisNgAuthModule,

  ],
  providers: [
    MenuService,
    SidebarShowService,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    PrimarySidebarComponent,
    SecondarySidebarComponent,
    ToggleFullscreenDirective,
    SidenavShowDirective,
  ],
  exports: [
    OswisNgAuthModule,
    HomeComponent,
    HeaderComponent,
    PrimarySidebarComponent,
    SecondarySidebarComponent,
  ],
})
export class OswisNgCoreModule {
  static forRoot(oswisCoreConfig: OswisCoreConfig): ModuleWithProviders {
    return {
      ngModule: OswisNgCoreModule,
      providers: [
        {provide: OSWIS_CORE_CONFIG, useValue: oswisCoreConfig,}
      ]
    };
  }
}
