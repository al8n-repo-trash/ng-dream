import {ElementRef, Injectable, Renderer2} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DomService {

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

  public setStyles = (el: HTMLElement, styles: object) => {
    for (const key of Object.keys(styles)) {
      if (styles.hasOwnProperty(key)) {
        el.style[key] = styles[key];
      }
    }
  }

  // public getChild = (el: HTMLElement, children: any) => {
  //   for (const key of Object.keys(styles)) {
  //
  //   }
  // }
}
