import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataInterface} from "./dialog-data.inteface";

export abstract class DialogComponent {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  public constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
