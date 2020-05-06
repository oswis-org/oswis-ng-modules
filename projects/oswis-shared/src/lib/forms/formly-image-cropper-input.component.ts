import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {CropperSettings, ImageCropperComponent} from 'ngx-img-cropper';
import {tap} from 'rxjs/operators';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'oswis-formly-image-cropper-input',
  template: `
    <div style="margin: .5em auto 2em;">
      <div>
        <h2>
          {{ to.label }}
          <button mat-stroked-button color="warn" [disabled]="uploadSuccess" type="button" (click)="upload()">
            Uložit obrázek
          </button>
        </h2>
      </div>
      <img-cropper [image]="data"
                   [settings]="cropperSettings"
                   (onCrop)="crop($event)"
                   [ngClass]="imageSetInCropper ? 'cropper-full' : 'cropper-empty'"
                   (imageSet)="imageSetListener($event)">
      </img-cropper>
      <!-- <img [src]="data.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight"> -->
    </div>
  `,
})
export class FormlyImageCropperInputComponent extends FieldType implements OnInit, AfterViewInit {
  formControl: FormControl;

  imageSetInCropper = false;
  uploadSuccess = false;
  data: any;
  cropperSettings: CropperSettings;
  // @ViewChild('cropper', undefined)
  @ViewChild(ImageCropperComponent, {read: true, static: true}) cropperEl: ImageCropperComponent;
  // cropper: ImageCropperComponent;
  @Output() refreshImage: EventEmitter<any>;

  constructor(
    // protected contactImageService: ContactImageService
  ) {
    super();
    this.cropperSettings = new CropperSettings();

    this.data = {};
  }

  static converterDataURItoBlob(dataURI) {
    let byteString;
    let mimeString;
    let ia;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
    // separate out the mime component
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }

  static base64MimeType(encoded) {
    let result = null;

    if (typeof encoded !== 'string') {
      return result;
    }

    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  }

  static dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  ngOnInit() {
    this.cropperSettings.width = this.to.hasOwnProperty('croppedWidth') ? this.to.croppedWidth : 120;
    this.cropperSettings.height = this.to.hasOwnProperty('croppedHeight') ? this.to.croppedHeight : 120;
    this.cropperSettings.croppedWidth = this.to.hasOwnProperty('croppedWidth') ? this.to.croppedWidth : 120;
    this.cropperSettings.croppedHeight = this.to.hasOwnProperty('croppedHeight') ? this.to.croppedHeight : 120;
    this.cropperSettings.canvasWidth = 250;
    this.cropperSettings.canvasHeight = 250;
    this.cropperSettings.keepAspect = this.to.hasOwnProperty('keepAspect') ? this.to.keepAspect : true;
    // this.cropperSettings.preserveSize = true;
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit()');
    this.data.image = this.formControl.value;
  }

  upload() {
    const formData = new FormData();

    console.log(this.data.image);

    const blob = FormlyImageCropperInputComponent.dataURItoBlob(this.data.image);
    let fileName = this.to.fileName;

    const ext = this.data.image.split(';')[0];

    if (ext.match(/jpeg/)) {
      fileName += '.jpg';
    } else if (ext.match(/png/)) {
      fileName += '.png';
    } else if (ext.match(/gif/)) {
      fileName += '.gif';
    } else if (ext.match(/bmp/)) {
      fileName += '.bmp';
    }

    formData.append('file', blob, fileName);

    this.to.upload$(formData).pipe(
      tap(
        x => {
          this.uploadSuccess = true;
          this.formControl.setValue(
            {id: x['id']}
          );
        }
      )
    ).subscribe();
  }

  imageSetListener(event: boolean) {
    this.imageSetInCropper = event;
    this.uploadSuccess = false;
  }

  crop(event) {
    this.uploadSuccess = false;
  }
}
