import {Injectable} from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class LogService {
  aside: Array<boolean>;
  loggingIn = false;
}
