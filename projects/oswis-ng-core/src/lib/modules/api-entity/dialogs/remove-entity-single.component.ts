import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'oswis-remove-entity-single',
  templateUrl: './remove-entity-single.component.html',
})
export class RemoveEntitySingleComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveEntitySingleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
