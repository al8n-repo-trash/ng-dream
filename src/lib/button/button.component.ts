/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NdArrowButtonType, NdArrowType, NdButtonType, NdRateType, NdShapeType} from '../core/types/button';
import {RendererService} from '../core/service/renderer.service';
import {_InitBtnType} from '../core/functions/button';



@Component({
  selector: 'button[nd-button]',// tslint:disable-line
  exportAs: 'ndButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})

export class NdButtonComponent implements AfterViewInit {
  @Input() ndType: NdButtonType = 'default';
  @Input() ndRate: NdRateType = 'default';
  @Input() ndShape: NdShapeType = 'rounded';
  @ViewChild('rippleContainer', {static: false}) rippleContainer: ElementRef;

  private prefix: string = 'nd-button';
  private readonly el: HTMLElement;

  public isBtnRipple: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    _InitBtnType(this.el, this.renderer, this.ndType, this.ndRate, this.isBtnRipple, this.prefix);
    this.changeDetectorRef.detectChanges();
  }

}

@Component({
  selector: 'button[nd-arrow-button]',// tslint:disable-line
  exportAs: 'ndButton',
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.scss', './button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NdArrowButtonComponent implements AfterViewInit {
  @Input() ndType: NdArrowButtonType = 'default';
  @Input() ndRate: NdRateType = 'default';
  @Input() ndArrowDirection: NdArrowType = 'right';

  private arrowPrefix: string = 'nd-arrow-button';
  private prefix: string = 'nd-button';
  private readonly el: HTMLElement;

  public isBtnRipple: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    _InitBtnType(this.el, this.renderer, this.ndType, this.ndRate, this.isBtnRipple, this.prefix);
    this._initShape();
    this.changeDetectorRef.detectChanges();
  }

  private _initShape(): void {
    if (!this.ndArrowDirection) {
      return;
    } else {
      if (this.ndType && this.ndType !== 'default') {
        if (this.ndRate && this.ndRate !== 'default') {
          RendererService.addClass(this.el, `${this.arrowPrefix}-${this.ndArrowDirection}-${this.ndType}-${this.ndRate}`, this.renderer);
        } else {
          RendererService.addClass(this.el, `${this.arrowPrefix}-${this.ndArrowDirection}-${this.ndType}`, this.renderer);
        }
      } else {
        if (this.ndRate && this.ndRate !== 'default') {
          RendererService.addClass(this.el, `${this.arrowPrefix}-${this.ndArrowDirection}-default-${this.ndRate}`, this.renderer);
        } else {
          RendererService.addClass(this.el, `${this.arrowPrefix}-${this.ndArrowDirection}`, this.renderer);
        }
      }
    }
  }
}
