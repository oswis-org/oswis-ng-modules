import {Directive, ElementRef, HostListener} from '@angular/core';
import * as screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullscreen]'
})
export class ToggleFullscreenDirective {

  constructor(private element: ElementRef) {
    if (screenfull && screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        this.element.nativeElement.classList.add('fullscreen');
      } else {
        this.element.nativeElement.classList.remove('fullscreen');
      }
    }
  }

  @HostListener('click') onClick() {
    if (screenfull && screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        this.element.nativeElement.classList.remove('fullscreen');
      } else {
        this.element.nativeElement.classList.add('fullscreen');
      }
      screenfull.toggle().then();
    }
  }
}
