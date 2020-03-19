import {Component, Input} from '@angular/core';

@Component({
  selector: 'oswis-api-entity-loading-show',
  template: `
    <mat-card-content>
      <div *ngIf="!empty" class="loading-shade">
        <mat-spinner></mat-spinner>
      </div>
      <div *ngIf="empty" class="loading-shade"><p>{{ entityName || 'Položka neexistuje.' }}</p></div>
    </mat-card-content>
  `,
})
export class LoadingShowComponent {
  @Input() entityName?: string;
  @Input() empty?: boolean;
}
