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
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {DomService} from '../core/service/dom.service';


// card
@Component({
  selector: 'nd-card, [ndStyle], [ndHorizontal], [ndCardShape], [ndCardType],[ndCardAnimation]',
  exportAs: 'ndCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-card nd-card-hover'}
})
export class NdCardComponent implements OnInit, AfterViewInit {
  @Input() public ndCardType: string;
  @Input() public ndCardShape: string;
  @Input() public ndCardAnimation: string;
  @Input() public ndHorizontal: string;
  @Input() public ndStyle: object;

  public el: HTMLElement;

  constructor(private elementRef: ElementRef, private domService: DomService, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {

    this.domService.addClass(this.el, this.renderer, 'nd-card-' + this.ndCardType);


    if (this.ndCardShape === 'circle') {
      // if (this.ndHorizontal)
      this.domService.removeClass(this.el, this.renderer, 'nd-card');
      this.domService.addClass(this.el, this.renderer, 'nd-card-' + this.ndCardShape);
      this.domService.setStyle(this.el, this.renderer, 'height', this.el.style.width);
    }

    if (this.ndCardShape === 'rounded') {
      this.domService.addClass(this.el, this.renderer, 'nd-card-' + this.ndCardShape);
    }

    if (this.ndCardAnimation === 'false') {
      this.domService.removeClass(this.el, this.renderer, 'nd-card-hover');
    }

    if (this.ndHorizontal === 'true' || this.el.hasAttribute('ndHorizontal')) {
      this.domService.addClass(this.el, this.renderer, 'nd-card-horizontal');
    }

    if (this.ndStyle) {
      DomService.setStyles(this.el, this.ndStyle);
    }

  }

  ngOnInit() {
  }
}

// header
@Component({
  selector: 'nd-card-header, [vertical], [align]',
  templateUrl: './card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NdCardHeaderComponent implements OnInit {
  @Input() private vertical: boolean;
  @Input() private align: string;
  public el: HTMLElement;

  constructor(private elementRef: ElementRef, private domService: DomService, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.vertical) {
      this.domService.setAttribute(this.el, this.renderer, 'class', 'nd-card-header-vertical');
    } else {
      this.domService.setAttribute(this.el, this.renderer, 'class', 'nd-card-header');
    }

    if (!this.align) {
      this.domService.setStyle(this.el, this.renderer, 'justify-content', 'flex-start');
    } else {
      this.domService.setStyle(this.el, this.renderer, 'justify-content', this.align);
    }
  }
}



// footer
@Component({
  selector: 'nd-card-footer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-card-footer'}
})

export class NdCardFooterComponent implements OnInit {
  ngOnInit() {
  }
}

// body
@Component({
  selector: 'nd-card-body',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-card-body'},
})

export class NdCardBodyComponent implements OnInit {
  public el: HTMLElement;

  constructor(private elementRef: ElementRef, private domService: DomService) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    // const shape = this.el.parentElement.getAttribute('ndCardShape');
    // if (shape === 'circle') {
    //   // this.el.style.height = '800px';
    //   const footer = this.el.parentElement.getElementsByTagName('nd-card-footer') as HTMLElement;
    //   this.el.style.height = this.el.parentElement.style.width - footer.style.height;
    //   console.log(footer.style.height);
    // }
  }
}
