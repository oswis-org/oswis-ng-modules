import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BasicModel, DialogComponent, DialogDataInterface} from "oswis-shared";
import {ApiEntityServiceInterface} from "../services/api-entity.service.interface";

interface EntityDialogDataInterface extends DialogDataInterface {
  items: BasicModel[];
  apiEntityService: ApiEntityServiceInterface;
}

@Component({
  selector: 'oswis-remove-entity-dialog',
  templateUrl: './remove-entity-dialog.component.html',
})
export class RemoveEntityDialog extends DialogComponent {
  constructor(public dialogRef: MatDialogRef<RemoveEntityDialog>, @Inject(MAT_DIALOG_DATA) public data: EntityDialogDataInterface) {
    super(dialogRef, data);
  }
}
