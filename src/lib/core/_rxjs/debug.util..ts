import {Observable} from 'rxjs';
import {environment} from '../../../../../../src/environments/environment.prod';


Observable.prototype.debug = (message: string) => {
  return this.do(
    (next) => {
      if (!environment.production) {
        console.log(message);
      }
    },
    err => {
      if (!environment.production) {
        console.error('ERROR>>', message, err);
      }
    },
    () => {
      if (!environment.production) {
        console.log('Completed - ');
      }
    }
  );
};
