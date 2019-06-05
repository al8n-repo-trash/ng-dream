/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {OverContent} from '../../select/select-over-ref';

export type OverParams<T> = {
  origin: HTMLElement;
  content: OverContent;
  data?: T;
  width?: string | number;
  height: string | number;
};
