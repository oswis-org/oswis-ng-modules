import {Component, Input, OnInit} from '@angular/core';
import {BasicModel} from "../../../../models/basic.model";
import {NameableModel} from "../../../../models/nameable.model";
import {AppUserModel} from "../../../auth/models/app-user.model";

@Component({
  selector: 'oswis-api-entity-basic-info-show',
  templateUrl: './basic-info-show.component.html',
})
export class BasicInfoShowComponent implements OnInit {
  @Input() title?: string;

  @Input() basic?: BasicModel;
  @Input() nameable?: NameableModel;

  @Input() type?: string;
  @Input() appUser?: AppUserModel;

  @Input() dateTime?: string;
  @Input() startDateTime?: string;
  @Input() endDateTime?: string;

  @Input() username?: string;
  @Input() fullName?: string;
  @Input() url?: string;
  @Input() email?: string;
  @Input() phone?: string;
  @Input() deleted?: string;
  @Input() active?: boolean;

  ngOnInit(): void {
    if (!this.basic) {
      this.basic = this.nameable;
    }
    if ('appUser' in this.basic) {
      // @ts-ignore
      this.appUser = this.basic.appUser;
    }
    if ('type' in this.basic) {
      // @ts-ignore
      this.type = this.basic.type;
    }
    if ('dateTime' in this.basic) {
      // @ts-ignore
      this.dateTime = this.basic.dateTime;
    }
    if ('startDateTime' in this.basic) {
      // @ts-ignore
      this.startDateTime = this.basic.startDateTime;
    }
    if ('endDateTime' in this.basic) {
      // @ts-ignore
      this.endDateTime = this.basic.endDateTime;
    }
    if ('username' in this.basic) {
      // @ts-ignore
      this.username = this.basic.username;
    }
    if ('fullName' in this.basic) {
      // @ts-ignore
      this.fullName = this.basic.fullName;
    }
    if ('url' in this.basic) {
      // @ts-ignore
      this.url = this.basic.url;
    }
    if ('email' in this.basic) {
      // @ts-ignore
      this.email = this.basic.email;
    }
    if ('phone' in this.basic) {
      // @ts-ignore
      this.phone = this.basic.phone;
    }
    if ('deleted' in this.basic) {
      // @ts-ignore
      this.deleted = this.basic.deleted;
    }
    if ('active' in this.basic) {
      // @ts-ignore
      this.active = this.basic.active;
    }
  }
}
