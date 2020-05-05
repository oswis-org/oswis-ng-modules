import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AbstractImageModel} from "@oswis-org/oswis-shared";

@Injectable()
export abstract class ImageUploadServiceInterface<Type extends AbstractImageModel = AbstractImageModel> {
  // noinspection JSUnusedGlobalSymbols
  abstract postImage(body: FormData): Observable<Type>;
}
