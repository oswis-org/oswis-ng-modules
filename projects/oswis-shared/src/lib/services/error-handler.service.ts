import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  public static handleError(text: string, err: HttpErrorResponse) {
    const errorEvent = err.error instanceof ErrorEvent;
    const messageType = errorEvent ? 'Chyba na serveru:' : 'Chyba:';
    const message = errorEvent ? err.error.message : (typeof err.error.detail === 'string') ? err.error.detail : err.name;
    console.error(messageType, message);
    return throwError({status: err.status, title: text, message: message});
  }
}
