/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {ElementRef, Injectable, Renderer2} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DomService {

  public static setStyles = (el: HTMLElement, styles: object) => {
    for (const key of Object.keys(styles)) {
      if (styles.hasOwnProperty(key)) {
        el.style[key] = styles[key];
      }
    }
  };

  constructor() { }

  public getElement = (elementRef: ElementRef): HTMLElement => {
    return elementRef.nativeElement;
  };

  public addClass = (el: HTMLElement, renderer: Renderer2, selector: string) => {
    renderer.addClass(el, selector);
  };

  public removeClass = (el: HTMLElement, renderer: Renderer2, selector: string) => {
    renderer.removeClass(el, selector);
  };

  public addChild = (el: HTMLElement, renderer: Renderer2, child: any) => {
    renderer.appendChild(el, child);
  };

  public removeChild = (el: HTMLElement, renderer: Renderer2, child: any) => {
    renderer.removeChild(el, child);
  };

  public setAttribute = (el: HTMLElement, renderer: Renderer2, attr: string, val: string, attrVal?: string | null) => {
    renderer.setAttribute(el, attr, val, attrVal);
  };

  public removeAttribute = (el: HTMLElement, renderer: Renderer2, attr: string) => {
    renderer.removeAttribute(el, attr);
  };

  public hasAttribute = (el: HTMLElement, attr: string): boolean => {
    return el.hasAttribute(attr);
  };

  public setStyle = (el: HTMLElement, renderer: Renderer2, attr: string, val: string) => {
    renderer.setStyle(el, attr, val);
  };


}
