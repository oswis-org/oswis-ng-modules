import {Directive, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

type Type = any;

@Directive()
export abstract class DialogComponentDirective {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  public constructor(
    public dialogRef: MatDialogRef<Type>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
