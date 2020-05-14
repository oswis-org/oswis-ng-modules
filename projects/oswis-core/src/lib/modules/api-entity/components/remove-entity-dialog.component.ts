import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {BasicModel, DialogComponent, DialogDataInterface} from "@oswis-org/oswis-shared";
import {ApiEntityServiceInterface} from "../services/api-entity.service.interface";

interface EntityDialogDataInterface extends DialogDataInterface {
  items: BasicModel[];
  service: ApiEntityServiceInterface;
}

@Component({
  selector: 'oswis-remove-entity-dialog',
  templateUrl: './remove-entity-dialog.component.html',
})
export class RemoveEntityDialog extends DialogComponent {
  public items: BasicModel[];
  public service: ApiEntityServiceInterface;

  constructor(public dialogRef: MatDialogRef<RemoveEntityDialog>, @Inject(MAT_DIALOG_DATA) public data: MatDialogConfig<EntityDialogDataInterface>) {
    super(dialogRef, data);
    this.items = data.data.items;
    this.service = data.data.service;
  }
}
