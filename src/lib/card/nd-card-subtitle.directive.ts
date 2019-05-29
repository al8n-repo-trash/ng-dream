import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'nd-card-subtitle,[nd-card-subtitle],[ndCardSubtitle]'
})

export class NdCardSubtitleDirective {
  @HostBinding('class.nd-card-subtitle') ndCardSubtitle = true;
  constructor() { }

}
