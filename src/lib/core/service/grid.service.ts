import {Injectable, Renderer2, RendererFactory2} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class NdGridService {
  private renderer: Renderer2;

  constructor(rendererFactory2: RendererFactory2) {
    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  public dealInput(el: HTMLElement, prefix: string, input: string | number) {
    if (input) {
      let tmp: number;
      if (typeof input !== 'number') {
        const num = input.replace('/^[0-9]$/', '');
        tmp = Number(num);
      } else {
        tmp = input;
      }

      if (tmp >= 24) {
        this.renderer.addClass(el, prefix + '24');
        return;
      }

      if (tmp < 1) {

        return;
      }

      if (tmp >= 1 && tmp < 24) {
        this.renderer.addClass(el, prefix + String(tmp));
      }
    }
  }

  public dealConfig(el: HTMLElement, prefix: string, obj: object) {
    if (this.isEmpty(obj)) {
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          this.dealInput(el, prefix + i + '-', obj[i]);
        }
      }
    }
  }

  public isEmpty(obj: object): boolean {
    return typeof obj !== 'undefined' && obj !== null;
  }
}
