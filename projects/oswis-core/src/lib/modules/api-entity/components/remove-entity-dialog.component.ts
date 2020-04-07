import {Component} from '@angular/core';
import {DialogComponent} from "../../../../../../oswis-shared/src/lib/components/dialog.component";
import {MatDialogRef} from "@angular/material/dialog";
import {BasicModel} from "../../../../../../oswis-shared/src/lib/models/basic.model";
import {ApiEntityService} from "../services/api-entity.service";
import {DialogDataInterface} from "../../../../../../oswis-shared/src/lib/components/dialog-data.inteface";

interface EntityDialogDataInterface extends DialogDataInterface {
  items: BasicModel[];
  apiEntityService?: ApiEntityService;
}

@Component({
  selector: 'oswis-remove-entity-dialog',
  templateUrl: './remove-entity-dialog.component.html',
})
export class RemoveEntityDialog extends DialogComponent {
  constructor(dialogRef: MatDialogRef<any>, data: EntityDialogDataInterface) {
    super(dialogRef, data);
  }
}
