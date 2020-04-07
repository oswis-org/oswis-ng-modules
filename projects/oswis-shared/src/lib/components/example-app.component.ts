import {ChangeDetectorRef, Component, Inject, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {SidebarShowService} from "../services/sidebar-show.service";
import {OswisConfig} from "../config/oswis.config";
import {OSWIS_CONFIG} from "../config/oswis.config.token";

@Component({
  selector: 'oswis',
  templateUrl: 'example-app.component.html',
})
export class ExampleAppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidebarShowService: SidebarShowService,
    @Inject(OSWIS_CONFIG) public oswisConfig: OswisConfig,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  getSidebarStatus(id: number = 1): boolean {
    return this.sidebarShowService.getSidebarStatus(id);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  notificationCreated(notification) {
    console.log('notificationCreated: ', notification);
  }

  notificationDestroyed(notification) {
    console.log('notificationDestroyed: ', notification);
  }

  closeAsides(reason: string): void {
    console.log('Close all asides. Reason:', reason);
    this.sidebarShowService.closeAllSidebars();
  }
}
