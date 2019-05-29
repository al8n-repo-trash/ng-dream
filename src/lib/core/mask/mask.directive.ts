import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[ndMask],[nd-mask]',
  host: {class: 'nd-mask'}
})
export class NdMaskDirective {
  @HostBinding('class.nd-mask') mask: boolean = true;
  constructor() { }

}
