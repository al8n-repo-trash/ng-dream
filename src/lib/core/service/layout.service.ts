/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import { Injectable } from '@angular/core';
import {Breakpoints, BreakpointType, CustomBreakpoint} from '../types/layout';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  public static dealBreakpoint(breakpoint: BreakpointType | CustomBreakpoint): string {
    if (typeof breakpoint === 'object') {
      return `(${breakpoint.type}-width: ${breakpoint.breakpoint}px)`;
    } else {
      return Breakpoints[breakpoint];
    }
  }

}
