import { Injectable } from '@angular/core';
import {Breakpoints, BreakpointType, CustomBreakpoint} from '../types/layout';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  static dealBreakpoint(breakpoint: BreakpointType | CustomBreakpoint): string {
    if (typeof breakpoint === 'object') {
      return `(${breakpoint.type}-width: ${breakpoint.breakpoint}px)`;
    } else {
      return Breakpoints[breakpoint];
    }
  }

}
