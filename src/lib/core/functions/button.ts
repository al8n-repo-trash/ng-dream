/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {Renderer2} from '@angular/core';
import {NdButtonType, NdRateType, NdShapeType} from '../types/button';
import {RendererService} from '../service/renderer.service';

export function _InitBtnType(
  el: HTMLElement,
  renderer: Renderer2,
  btnType: NdButtonType,
  btnRate: NdRateType,
  isRipple: boolean,
  prefix: string,
  btnShape?: NdShapeType
) {
  if (!btnType || btnType === 'default') {
    _dealRate(el, renderer, btnRate, prefix, 'default');
  } else if (btnType === 'stroked') {
    _dealRate(el, renderer, btnRate, prefix, 'stroked');
  } else if (btnType === 'flat') {
    _dealRate(el, renderer, btnRate, prefix, 'flat');
  } else if (btnType === 'text') {
    isRipple = false;
    _dealRate(el, renderer, btnRate, prefix, 'text');
  } else if (btnType === 'link') {
    isRipple = false;
    _dealRate(el, renderer, btnRate, prefix, 'link');
  } else if (btnType === 'raise') {
    _dealRate(el, renderer, btnRate, prefix, 'raise');
  } else if (btnType === 'burger') {
    isRipple = false;
    _dealRate(el, renderer, btnRate, prefix, 'burger');
  }
}

function _dealRate(el: HTMLElement, renderer: Renderer2, btnRate: NdRateType, prefix: string, midFix: string) {
  if (!btnRate || btnRate === 'default') {
    RendererService.addClass(el, `${prefix}-${midFix}`, renderer);
  } else {
    RendererService.addClass(el, `${prefix}-${midFix}-${btnRate}`, renderer);
  }
}


