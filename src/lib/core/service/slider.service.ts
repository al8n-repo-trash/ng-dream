import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NdSliderService {

  constructor() { }

  public smoothScroll(el: HTMLElement, scroll: number, duration: number = 400, direction: string = 'top') {
    const start = direction === 'top' ? el.scrollTop : el.scrollLeft;

    if (scroll < 0) {
      scroll = 0;
    }

    const distance = (scroll - start) - 77;
    const startTime = new Date().getTime();

    if (!duration) {
      duration = 400;
    }

    const move = () => {
      const time =  new Date().getTime() - startTime;
      const newScroll = this.easeInOutQuart(time, start, distance, duration);

      if (time < duration) {
        requestAnimationFrame(move);
      }

      if (el.scrollTo) {
        if (direction === 'top') {
          el.scrollTo(el.scrollLeft, newScroll);
        } else {
          el.scrollTo(newScroll, el.scrollTop);
        }
      } else {
        if (direction === 'top') {
          el.scrollTop = newScroll;
        } else {
          el.scrollLeft = newScroll;
        }
      }
    }
  }

  public easeInOutQuart = (time: number, from: number, distance: number, duration: number) => {
    const st = time / duration / 2;
    if (st < 1) {
      return distance / 2 * time * time * time * time + from;
    }
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }
}
