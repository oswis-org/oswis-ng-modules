import {Directive, ElementRef, HostListener} from '@angular/core';
import * as screenfull from 'screenfull';
import {Screenfull} from 'screenfull';

@Directive({
  selector: '[appToggleFullscreen]'
})
export class ToggleFullscreenDirective {
  constructor(private element: ElementRef) {
    let screenFull = (screenfull as Screenfull);
    if (screenFull && screenFull.isEnabled) {
      if (screenFull.isFullscreen) {
        this.element.nativeElement.classList.add('fullscreen');
      } else {
        this.element.nativeElement.classList.remove('fullscreen');
      }
    }
  }

  @HostListener('click') onClick() {
    let screenFull = (screenfull as Screenfull);
    if (screenFull && screenFull.isEnabled) {
      if (screenFull.isFullscreen) {
        this.element.nativeElement.classList.remove('fullscreen');
      } else {
        this.element.nativeElement.classList.add('fullscreen');
      }
      screenFull.toggle().then();
    }
  }
}
