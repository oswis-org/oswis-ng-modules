import {Component, Input, OnInit} from '@angular/core';
import {AppUserModel, BasicModel, NameableModel} from "oswis-shared";

@Component({
  selector: 'oswis-api-entity-basic-info-show',
  templateUrl: './basic-info-show.component.html',
})
export class BasicInfoShowComponent implements OnInit {
  @Input() boxTitle?: string;

  @Input() basicItem?: BasicModel;
  @Input() nameableItem?: NameableModel;

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

  fillProperties() {
    this.basicItem = this.basicItem ? this.basicItem : this.nameableItem;
    if (!this.basicItem) {
      return;
    }
    this.fillCommonProperties();
    this.fillContactProperties();
    this.fillAppUserProperties();
    this.fillDateTimeProperties();
  }

  fillContactProperties(): void {
    if ('fullName' in this.basicItem) {
      // @ts-ignore
      this.fullName = this.basicItem.fullName;
    }
    if ('url' in this.basicItem) {
      // @ts-ignore
      this.url = this.basicItem.url;
    }
    if ('email' in this.basicItem) {
      // @ts-ignore
      this.email = this.basicItem.email;
    }
    if ('phone' in this.basicItem) {
      // @ts-ignore
      this.phone = this.basicItem.phone;
    }
  }

  fillCommonProperties(): void {
    if ('type' in this.basicItem) {
      // @ts-ignore
      this.type = this.basicItem.type;
    }
    if ('deleted' in this.basicItem) {
      // @ts-ignore
      this.deleted = this.basicItem.deleted;
    }
    if ('active' in this.basicItem) {
      // @ts-ignore
      this.active = this.basicItem.active;
    }
  }

  fillDateTimeProperties(): void {
    if ('dateTime' in this.basicItem) {
      // @ts-ignore
      this.dateTime = this.basicItem.dateTime;
    }
    if ('startDateTime' in this.basicItem) {
      // @ts-ignore
      this.startDateTime = this.basicItem.startDateTime;
    }
    if ('endDateTime' in this.basicItem) {
      // @ts-ignore
      this.endDateTime = this.basicItem.endDateTime;
    }
  }


  fillAppUserProperties(): void {
    if ('appUser' in this.basicItem) {
      // @ts-ignore
      this.appUser = this.basicItem.appUser;
    }
    if ('username' in this.basicItem) {
      // @ts-ignore
      this.username = this.basicItem.username;
    }
  }

}
