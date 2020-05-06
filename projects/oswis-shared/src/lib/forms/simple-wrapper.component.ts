import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oswis-formly-wrapper-panel',
  template: `
    <ng-container #fieldComponent></ng-container>`,
})
export class SimpleWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef, static: true}) fieldComponent: ViewContainerRef;
}
