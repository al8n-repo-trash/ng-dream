/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone, OnInit, Renderer2} from '@angular/core';
import {RendererService} from '../service/renderer.service';
import {NdRippleConfig} from '../types/ripple';



@Directive({
  selector: '[nd-ripple],[ndRipple]', // tslint:disable-line
  exportAs: 'ndRipple',
  host: {class: 'nd-ripple'}
})
export class NdRippleDirective implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @Input() ndRipple: boolean = true;
  @Input() ndRippleColor: string;
  @Input() ndRippleDuration: number = 0.4;
  @Input() ndRippleOpacity: number = 0.4;
  @Input() ndRippleBoxShadow: string = 'none';
  @Input() ndRippleSize: number = 200;
  @Input() ndRippleConfig: NdRippleConfig;

  private readonly el: HTMLElement;
  private rippleEl: HTMLElement;

  private static rippleRecover(e: MouseEvent | TouchEvent | TransitionEvent, renderer: Renderer2) {
    const realEl = e.target as HTMLElement;
    if (realEl.getAttribute('animating') === '2' || realEl.getAttribute('animating') === '3') {
      const styleMap = {
        transition: 'none',
        transform: 'translate(-50%, -50%) scale(0)',
        'box-shadow': 'none',
      };
      RendererService.updateStyles(realEl, styleMap, renderer);
      RendererService.setAttribute(realEl, {animating: '0'}, renderer);
    }
  }

  @HostListener('mousedown', ['$event']) down(e: MouseEvent) {
    if (this.ndRipple) {
      this.rippleStart(e);
    }
  }

  @HostListener('mouseup', ['$event']) up(e: MouseEvent) {
    if (this.ndRipple) {
      this.rippleEnd(e);
    }
  }

  @HostListener('mousemove', ['$event']) move(e: MouseEvent) {
    if (this.ndRipple) {
      const rippleEl = this.el.querySelector('.nd-ripple-effect') as HTMLElement;
      if (rippleEl.hasAttribute('ripple-cancel-on-move') && (e.movementX !== 0 || e.movementY !== 0)) {
        this.rippleRetrieve(e);
      }
    }
  }

  @HostListener('mouseleave', ['$event']) leave(e: MouseEvent) {
    if (this.ndRipple) {
      this.rippleRetrieve(e);
    }
  }

  @HostListener('touchestart', ['$event']) touchStart(e: TouchEvent) {
    if (this.ndRipple) {
      this.rippleStart(e);
    }
  }

  @HostListener('touchemove', ['$event']) touchMove(e: TouchEvent) {
    if (this.ndRipple) {
      const rippleEl = this.el.querySelector('.nd-ripple-effect') as HTMLElement;
      if (rippleEl.hasAttribute('ripple-cancel-on-move')) {
        this.rippleRetrieve(e);
        return
      }
      let overEl;
      try {
        overEl = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).className.indexOf('nd-ripple') >= 0;
      } catch (err) {
        overEl = false;
      }
      if (!overEl) {
        this.rippleRetrieve(e);
      }
    }
  }

  @HostListener('touchend', ['$event']) touch(e: TouchEvent) {
    if (this.ndRipple) {
      this.rippleEnd(e);
    }
  }

  @HostListener('transitionend', ['$event']) transition(e: TouchEvent) {
    if (this.ndRipple) {
      NdRippleDirective.rippleRecover(e, this.renderer);
    }
  }

  ngAfterViewInit() {
    if (this.ndRipple) {
      this.rippleEl = this.renderer.createElement('div');
      this.renderer.addClass(this.rippleEl, 'nd-ripple-effect');
      this.renderer.appendChild(this.el, this.rippleEl);
      const styleMap = {
        width: `${this.ndRippleSize}px`,
        height: `${this.ndRippleSize}px`
      };

      RendererService.updateStyles(this.rippleEl, styleMap, this.renderer);
    }
  }

  private rippleStart(e) {
    NdRippleDirective.rippleRecover(e, this.renderer);
    const eTargetEl = e.target as HTMLElement;
    const rippleEl = this.el.querySelector('.nd-ripple-effect') as HTMLElement;
    if (rippleEl.getAttribute('animating') === '0' || !rippleEl.hasAttribute('animating') && eTargetEl.className.indexOf('nd-ripple') > -1) {
      this.renderer.setAttribute(rippleEl, 'animating', '1');

      const offsetX = typeof e.offsetX === 'number' ? e.offsetX : e.touches[0].clientX - eTargetEl.getBoundingClientRect().left;
      const offsetY = typeof e.offsetY === 'number' ? e.offsetY : e.touches[0].clientY - eTargetEl.getBoundingClientRect().top;

      // tslint:disable-next-line:max-line-length
      const fullCoverRadius = Math.max(Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)), Math.sqrt(Math.pow(eTargetEl.clientWidth - offsetX, 2) + Math.pow(eTargetEl.clientHeight - offsetY, 2)), Math.sqrt(Math.pow(offsetX, 2) + Math.pow(eTargetEl.clientHeight - offsetY, 2)), Math.sqrt(Math.pow(offsetY, 2) + Math.pow(eTargetEl.clientWidth - offsetX, 2)));

      const expandTime = this.ndRippleDuration;

      if (this.ndRippleColor) {
        this.renderer.setStyle(rippleEl, 'background', `${this.ndRippleColor}`);
      }

      const styleMap = {
        opacity: `${this.ndRippleOpacity}`,
        'box-shadow': `${this.ndRippleBoxShadow}`,
        top: `${offsetY}px`,
        left: `${offsetX}px`,
        transform: `translate(-50%, -50%) scale(${fullCoverRadius / 100})`,
        transition: `transform ${expandTime}s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.1s linear`
      };

      RendererService.updateStyles(rippleEl, styleMap, this.renderer);
    }
  }

  private rippleEnd(e) {
    const rippleEl = this.el.querySelector('.nd-ripple-effect') as HTMLElement;
    if (rippleEl.getAttribute('animating') === '1') {

      RendererService.setAttribute(rippleEl, {animating: '2'}, this.renderer);

      const background = window.getComputedStyle(rippleEl, null).getPropertyValue('background');
      const destinationRadius = e.target.clientWidth + e.target.clientHeight;

      this.renderer.setStyle(rippleEl, 'transition', 'none');

      const expandTime = this.ndRippleDuration;

      const styleMap = {
        background: `radial-gradient(transparent 10%, ${background} 40%`,
        opacity: `0`,
        'box-shadow': `${this.ndRippleBoxShadow}`,
        transform: `translate(-50%, -50%) scale(${destinationRadius / 100})`,
        transition: `transform ${expandTime}s linear, background ${expandTime}s linear, opacity ${expandTime}s linear`
      };

      RendererService.updateStyles(rippleEl, styleMap, this.renderer);
    }
  }

  private rippleRetrieve(e) {
    const rippleEl = this.el.querySelector('.nd-ripple-effect') as HTMLElement;
    if (rippleEl.style.transform === 'translate(-50%, -50%) scale(0)') {
      RendererService.setAttribute(rippleEl, {animating: '0'}, this.renderer);
    }

    if (rippleEl.getAttribute('animating') === '1') {
      RendererService.setAttribute(rippleEl, {animating: '3'}, this.renderer);
      const collapseTime = this.ndRippleDuration;

      const styleMap = {
        transition: `transform ${collapseTime}s linear, box-shadow ${collapseTime}s linear`,
        'box-shadow': 'none',
        transform: `translate(-50%, -50%) scale(0)`
      };

      RendererService.updateStyles(rippleEl, styleMap, this.renderer);
    }
  }
}


