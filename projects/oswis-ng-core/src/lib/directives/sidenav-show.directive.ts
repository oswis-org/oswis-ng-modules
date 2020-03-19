import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appSidenavShow]'
})
export class SidenavShowDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
