import { Directive } from '@angular/core';

@Directive({
  selector: '[nd-card-img]',
  host: {class: 'nd-card-img'}
})
export class NdCardImgDirective {

  constructor() { }

}
