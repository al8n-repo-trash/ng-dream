/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import {AttributeMap, StyleMap} from '../types/renderer';



@Injectable({
  providedIn: 'root'
})

export class RendererService {
  private readonly _renderer: Renderer2;

  public static addlistener(
    el: HTMLElement | ElementRef | Document | Window | Body,
    event: string,
    callback: (event: any) => (boolean | void),
    renderer: Renderer2): void {
    
    const realEl = RendererService._toEl(el);
    
    renderer.listen(realEl, event, callback);

  }
  
  public static removeAttribute(
    el: HTMLElement | ElementRef | EventTarget, 
    attr: AttributeMap,
    renderer: Renderer2
  ): void {
    const realEl = RendererService._toEl(el);
    
    for (const i in attr) {
      if (attr.hasOwnProperty(i)) {
        renderer.removeAttribute(realEl, i);
      }
    }
  }
  
  public static setAttribute(el: HTMLElement | ElementRef | EventTarget, attr: AttributeMap, renderer: Renderer2): void {
    const realEl = RendererService._toEl(el);

    for (const i in attr) {
      if (attr.hasOwnProperty(i)) {
        renderer.setAttribute(realEl, i, attr[i]);
      }
    }
  }

  public static updateStyles(el: HTMLElement | ElementRef | EventTarget, styles: StyleMap, renderer: Renderer2): void {
    const realEl = RendererService._toEl(el);

    for (const i in styles) {
      if (styles.hasOwnProperty(i)) {
        renderer.setStyle(realEl, i, styles[i]);
      }
    }

  }

  public static removeStyles(el: HTMLElement | ElementRef, styles: string[] | string | StyleMap, renderer: Renderer2): void {
    const realEl = RendererService._toEl(el);

    if (typeof styles === 'string') {

      renderer.removeStyle(realEl, styles);

    } else if (typeof styles === 'object' && !(styles instanceof Array)) {

      for (const i in styles) {

        if (styles.hasOwnProperty(i)) {

          renderer.removeStyle(realEl, i);

        }

      }
    } else {

      for (const i of styles) {

        renderer.removeStyle(realEl, i);

      }
    }
  }

  public static addClass(el: HTMLElement | ElementRef, klass: string | string[], renderer: Renderer2): void {
    const realEl = RendererService._toEl(el);

    if (typeof klass === 'string') {
      renderer.addClass(realEl, klass);
      return;
    } else {
      for (const i of klass) {
        renderer.addClass(realEl, i);
      }
      return;
    }

  }

  public static removeClass(el: HTMLElement | ElementRef, klass: string | string[], renderer: Renderer2): void {
    const realEl = RendererService._toEl(el);

    if (typeof klass === 'string') {
      renderer.removeClass(realEl, klass);
      return;
    } else {
      for (const i of klass) {
        renderer.removeClass(realEl, i);
      }
      return;
    }
  }

  public static getFirstElByTagName(el: HTMLElement | ElementRef | Document, aim: string): HTMLElement {

    const realEl: HTMLElement = RendererService._toEl(el);

    return realEl.getElementsByTagName(aim)[0] as HTMLElement;
  }

  public static getFirstElByClassName(el: HTMLElement | ElementRef | Document, aim: string): HTMLElement {

    const realEl: HTMLElement = RendererService._toEl(el);

    return realEl.getElementsByClassName(aim)[0] as HTMLElement;
  }

  private static _toEl(el: HTMLElement | ElementRef | Document | EventTarget | Window | Body): HTMLElement {
    if (el.hasOwnProperty('nativeElement')) {
      return el['nativeElement']; // tslint:disable-line:no-string-literal
    } else {
      return el as HTMLElement;
    }
  }

  constructor(
    rendererFactory2: RendererFactory2,
  ) {
    this._renderer = rendererFactory2.createRenderer(null, null);
  }

}
