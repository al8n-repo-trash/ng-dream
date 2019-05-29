import {Directive, HostBinding, Input} from '@angular/core';


@Directive({
  selector: '[nd-navbar-center],[ndNavbarCenter]',
})

export class NdNavbarCenterDirective {
  @HostBinding('class.nd-navbar-center') center: boolean = true;
  constructor() { }
}

