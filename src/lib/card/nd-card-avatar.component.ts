/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[avatarUrl],nd-card-avatar,[avatarWidth], [avatarHeight], [avatarType]',
  exportAs: 'ndCardAvatar',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NdCardAvatarComponent implements OnInit {
  @Input() private avatarHeight: string;
  @Input() private avatarWidth: string;
  @Input() private avatarUrl: string;
  @Input() private avatarType: string;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.avatarWidth) {
      this.elementRef.nativeElement.style.width = this.avatarWidth;
    }

    if (this.avatarHeight) {
      this.elementRef.nativeElement.style.height = this.avatarHeight;
    }

    if (!this.avatarType || this.avatarType === 'circle') {
      this.elementRef.nativeElement.setAttribute('class', 'nd-card-avatar');
    } else {
      this.elementRef.nativeElement.setAttribute('class', 'nd-card-avatar-' + this.avatarType);
    }

    this.elementRef.nativeElement.innerHTML = '<img src=\'' + this.avatarUrl  + '\'>';
  }
}



