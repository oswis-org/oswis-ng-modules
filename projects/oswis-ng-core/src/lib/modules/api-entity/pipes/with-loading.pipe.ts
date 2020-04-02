import {Pipe, PipeTransform} from '@angular/core';
import {isObservable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  // Source:
  // https://medium.com/angular-in-depth/angular-show-loading-indicator-when-obs-async-is-not-yet-resolved-9d8e5497dd8
  transform(val) {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => ({
          loading: value.type === 'start',
          value: value.type ? value.value : value
        })),
        startWith({loading: true}),
        catchError(error => of({loading: false, error}))
      )
      : val;
  }
}
