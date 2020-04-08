import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div style="width: 100%;height: 100%;">
      <img alt="One Simple Web IS" style="display:block;width: 30%;margin: 1em auto;" [src]="'./assets/oswis/logo.png'">
    </div>
  `,
})
export class HomeComponent {
}
