/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {AfterViewInit, Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {NdButtonType, NdRateType, NdShapeType} from '../core/types/button';


@Directive({
  selector: '[nd-button]', // tslint:disable-line
  exportAs: 'ndButton'
})
export class NdButtonDirective implements OnChanges, OnInit, AfterViewInit {
  @Input() ndType: NdButtonType = 'default';
  @Input() ndRate: NdRateType = 'default';
  @Input() ndShape: NdShapeType = 'rounded';
  @HostBinding('attr.nd-ripple') ndRipple: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {

  }

  ngOnChanges() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.ndRipple.ngAfterViewInit();
  }
}
