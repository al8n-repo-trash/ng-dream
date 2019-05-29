import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'nd-card-title, [nd-card-title], [ndCardTitle]'
})
export class NdCardTitleDirective {
  @HostBinding('class.nd-card-title') ndCardTitle = true;
  constructor() { }

}
