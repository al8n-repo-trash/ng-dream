/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

export type DragType = 'nd-drag-dashed'| 'nd-drag-solid' | 'nd-drag-none';
export type DropType = 'nd-drop-default'| 'nd-drop-solid' | 'nd-drop-none';
export interface DragData {
  tag: string;
  data: any;
}

