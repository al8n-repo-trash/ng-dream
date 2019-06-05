/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

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
