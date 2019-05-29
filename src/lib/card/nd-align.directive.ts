import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[ndAvatarCenter]'
})
export class NdAvatarCenterDirective {
  @HostBinding('class.nd-card-avatar-center') center = true;
  constructor() { }

}

@Directive({
  selector: '[ndAvatarStart]'
})
export class NdAvatarStartDirective {
  @HostBinding('class.nd-card-avatar-start') start = true;
  constructor() { }

}

@Directive({
  selector: '[ndAvatarEnd]'
})
export class NdAvatarEndDirective {
  @HostBinding('class.nd-card-avatar-end') end = true;
  constructor() { }

}
