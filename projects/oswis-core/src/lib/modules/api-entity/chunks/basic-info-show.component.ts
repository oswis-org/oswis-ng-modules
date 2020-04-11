import {Component, Input, OnInit} from '@angular/core';
import {AppUserModel, BasicModel, NameableModel} from "oswis-shared";

type Nameable = NameableModel;

@Component({
  selector: 'oswis-api-entity-basic-info-show',
  templateUrl: './basic-info-show.component.html',
})
export class BasicInfoShowComponent implements OnInit {
  @Input() boxTitle?: string;

  @Input() item?: BasicModel | NameableModel;

  @Input() type?: string;
  @Input() deleted?: string;
  @Input() active?: boolean;

  @Input() appUser?: AppUserModel;
  @Input() username?: string;

  @Input() dateTime?: string;
  @Input() startDateTime?: string;
  @Input() endDateTime?: string;

  @Input() fullName?: string;
  @Input() url?: string;
  @Input() email?: string;
  @Input() phone?: string;

  ngOnInit(): void {
    this.fillProperties();
  }

  nameable(): NameableModel {
    return this.item instanceof NameableModel || typeof this.item === typeof NameableModel ? <NameableModel>this.item : null;
  }

  isNameable(): boolean {
    return this.item instanceof NameableModel || typeof this.item === typeof NameableModel;
  }

  fillProperties() {
    if (!this.item) {
      return;
    }
    this.fillCommonProperties();
    this.fillContactProperties();
    this.fillAppUserProperties();
    this.fillDateTimeProperties();
  }

  fillContactProperties(): void {
    if ('fullName' in this.item) {
      // @ts-ignore
      this.fullName = this.item.fullName;
    }
    if ('url' in this.item) {
      // @ts-ignore
      this.url = this.item.url;
    }
    if ('email' in this.item) {
      // @ts-ignore
      this.email = this.item.email;
    }
    if ('phone' in this.item) {
      // @ts-ignore
      this.phone = this.item.phone;
    }
  }

  fillCommonProperties(): void {
    if ('type' in this.item) {
      // @ts-ignore
      this.type = this.item.type;
    }
    if ('deleted' in this.item) {
      // @ts-ignore
      this.deleted = this.item.deleted;
    }
    if ('active' in this.item) {
      // @ts-ignore
      this.active = this.item.active;
    }
  }

  fillDateTimeProperties(): void {
    if ('dateTime' in this.item) {
      // @ts-ignore
      this.dateTime = this.item.dateTime;
    }
    if ('startDateTime' in this.item) {
      // @ts-ignore
      this.startDateTime = this.item.startDateTime;
    }
    if ('endDateTime' in this.item) {
      // @ts-ignore
      this.endDateTime = this.item.endDateTime;
    }
  }

  fillAppUserProperties(): void {
    if ('appUser' in this.item) {
      // @ts-ignore
      this.appUser = this.item.appUser;
    }
    if ('username' in this.item) {
      // @ts-ignore
      this.username = this.item.username;
    }
  }

}
