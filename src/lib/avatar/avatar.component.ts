/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {AvatarType} from '../core/types/avatar';
import {RendererService} from '../core/service/renderer.service';

@Component({
  selector: 'nd-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-avatar'}
})
export class NdAvatarComponent implements OnInit {
  @Input() ndAvatarUrl: string;
  @Input() ndType: AvatarType = 'circle';
  @Input() ndSize: number | string;
  // @Input() ndStyle: {};

  private readonly _el: HTMLElement;
  private _borderRadius: number = 4;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit() {
    this._dealSize();
    this._dealType();
  }

  private _dealType(): void {
    if (!this.ndType || this.ndType === 'circle') {
      return
    }

    if (this.ndType === 'rect') {
      RendererService.updateStyles(this._el, {'border-radius': 0}, this._renderer);
      return;
    }

    if (this.ndType === 'rounded') {
      RendererService.updateStyles(this._el, {'border-radius': `${this._borderRadius}px`}, this._renderer);
      return;
    }
  }

  private _dealSize(): void {
    if (this.ndSize && typeof this.ndSize === 'number') {
      RendererService.updateStyles(this._el, {width: `${this.ndSize}px`, height: `${this.ndSize}px`}, this._renderer);
      return;
    }

    if (this.ndSize && typeof this.ndSize === 'string') {
      RendererService.updateStyles(this._el, {width: this.ndSize, height: this.ndSize}, this._renderer);
      return;
    }
  }
}
