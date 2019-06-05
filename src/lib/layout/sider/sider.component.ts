/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Breakpoints, BreakpointType, CustomBreakpoint} from '../../core/types/layout';
import {LayoutService} from '../../core/service/layout.service';
import {RendererService} from '../../core/service/renderer.service';
import {MaskService} from '../../core/service/mask.service';




@Component({
  selector: 'nd-sider,[ndBreakpoint]',
  exportAs: 'ndSider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss'],
  providers: [LayoutService, RendererService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {class: 'nd-sider-default'}
})
export class NdSiderComponent implements OnInit, AfterViewInit, OnDestroy {

  public show: boolean;

  // el is the current component
  private readonly el: HTMLElement;

  private readonly elStylesOnOpen: {} = {
    width: '300px',
    top: '0',
    'z-index': '200'
  };

  private readonly elStylesOnRemove: string[] = ['top', 'width'];

  // layoutEl is the nd-layout component
  private layoutEl: HTMLElement;

  private readonly maskElOnRemove: string[] = ['opacity', 'z-index'];

  // the breakpoint whether show the sider
  private realBKP: string;

  // listen the window size
  private bkp: BreakpointObserver;

  //  the menu component
  private menuEl: HTMLElement;

  // the main component
  private mainEl: HTMLElement;

  // the navbar component
  private navbarEl: HTMLElement;

  // the flag of current layout state
  public bkpScreen: boolean = true;
  
  // custom the breakpoint
  @Input() ndBreakpoint: BreakpointType | CustomBreakpoint = 'lg';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private maskService: MaskService
  ) {
    this.el = this.elementRef.nativeElement;
    this.bkp = this.breakpointObserver;
    this.realBKP = LayoutService.dealBreakpoint(this.ndBreakpoint);
  }



  ngOnInit() {
    this.initSiderView();
  }

  ngAfterViewInit() {
    this.layoutEl = this.el.parentElement.parentElement;
    this.menuEl = RendererService.getFirstElByTagName(this.el, 'nd-sider-menu');
    this.navbarEl = RendererService.getFirstElByTagName(document, 'nd-navbar');

    this.mainEl = this.el.nextElementSibling as HTMLElement;
    this.bkp
      .observe([this.realBKP])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          /**
           * control show sider or not
           */
          this.bkpScreen = true;
          this.show = true;

          RendererService.removeStyles(this.mainEl, 'left', this.renderer);
          RendererService.removeStyles(this.menuEl, 'display', this.renderer);
          this.renderer.removeClass(this.navbarEl, 'nd-navbar-md-default');

          RendererService.removeStyles(this.el, this.elStylesOnRemove, this.renderer);

          setTimeout(() => {
            RendererService.removeStyles(this.el, 'z-index', this.renderer);
          }, 400);

        } else {
          /**
           * adjust the layout and style in md screen
           */
          this.bkpScreen = false;
          this.show = false;
          RendererService.updateStyles(this.menuEl, {display: 'none'}, this.renderer);
          setTimeout(() => {
            RendererService.updateStyles(this.mainEl, {left: 0}, this.renderer);
          }, 400);
          RendererService.updateStyles(this.el, {width: 0}, this.renderer);
        }
      });

  }



  private initSiderView() {
    if (typeof this.ndBreakpoint === 'object') {
      if (window.innerWidth <= this.ndBreakpoint.breakpoint) {
        this.bkpScreen = false;
        this.show = false;
      } else {
        this.bkpScreen = true;
        this.show = true;
      }
    } else {
      if (window.innerWidth <= Number(Breakpoints[this.ndBreakpoint].replace('/^[0-9]$/', ''))) {
        this.bkpScreen = false;
        this.show = false;
      } else {
        this.bkpScreen = true;
        this.show = true;
      }
    }
  }

  public showMenu() {
    if (this.bkpScreen) {
        if (this.show) {
          this.show = false;
          RendererService.updateStyles(this.el, {width: 0}, this.renderer);
          RendererService.updateStyles(this.menuEl, {display: 'none'}, this.renderer);
        } else {
          this.show = true;
          RendererService.removeStyles(this.el, 'width', this.renderer);
          RendererService.removeStyles(this.menuEl, 'display', this.renderer);
        }
    } else {
        if (this.show) {
          this.show = false;
          RendererService.updateStyles(this.menuEl, {display: 'none'}, this.renderer);
          RendererService.updateStyles(this.mainEl, {left: '0'}, this.renderer);
          RendererService.updateStyles(this.el, {width: 0}, this.renderer);
          RendererService.removeStyles(this.el, 'top', this.renderer);

          this.renderer.removeClass(this.navbarEl, 'nd-navbar-md-default');
          setTimeout(() => {
            RendererService.removeStyles(this.el, 'z-index', this.renderer);
          }, 400);
        } else {
          this.show = true;
          this.renderer.addClass(this.navbarEl, 'nd-navbar-md-default');

          // deal el style
          RendererService.updateStyles(this.el, this.elStylesOnOpen, this.renderer);

          RendererService.removeStyles(this.menuEl, 'display', this.renderer);
          RendererService.updateStyles(this.mainEl, {left: '300px'}, this.renderer);
        }
    }
  }


  ngOnDestroy() {
    this.bkp.ngOnDestroy();
  }
}
