/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {Observable} from 'rxjs';
import {NdMaskComponent} from '../mask/mask.component';

export interface MaskRef {
  onClose: Observable<any>,
  instance: NdMaskComponent
}

