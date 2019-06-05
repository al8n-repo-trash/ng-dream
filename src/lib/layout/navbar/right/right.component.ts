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
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BreakpointType, CustomBreakpoint, Navs} from '../../../core/types/layout';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {LayoutService} from '../../../core/service/layout.service';
import {RendererService} from '../../../core/service/renderer.service';


@Component({
  selector: 'nd-navbar-right',
  exportAs: 'ndNavbarRight',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
  providers: [RendererService, LayoutService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})

export class NdNavbarRightComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.nd-navbar-right') right: boolean = true;

  @Input() ndNavs: Navs[] = [];
  @Input() ndSearch: boolean = true;

  @ViewChild('navbarMenu', {static: false}) navbarMenuRef: ElementRef;

  private navbarMenuEl: HTMLElement;
  
  // the breakpoint whether show the right
  private realBKP: string;

  // the current el
  private readonly el: HTMLElement;

  // the navbar el
  private navbarEl: HTMLElement;

  // the flag of current layout state
  public bkpScreen: boolean = true;

  // listen the window size
  private bkp: BreakpointObserver;

  //
  public isNavsShown: boolean = false;


  // custom the breakpoint
  @Input() ndBreakpoint: BreakpointType | CustomBreakpoint = 'lg';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.bkp = this.breakpointObserver;
    this.realBKP = LayoutService.dealBreakpoint(this.ndBreakpoint);
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.navbarEl = this.el.parentElement.parentElement;
    this.bkp
      .observe([this.realBKP])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.bkpScreen = true;
        } else {
          this.bkpScreen = false;
        }
      })
  }

  public showNavs() {
    if (!this.bkpScreen) {
      if (!this.isNavsShown) {
        this.isNavsShown = true;
        if (this.navbarMenuRef && this.navbarMenuRef.nativeElement) {
          // this.renderer.setStyle(this.navbarMenuRef.nativeElement, 'display', 'block');
          RendererService.updateStyles(this.navbarMenuRef, {width: '100%'}, this.renderer);
          this.navbarMenuEl = this.navbarMenuRef.nativeElement;
        }

      } else {
        this.isNavsShown = false;
        if (this.navbarMenuRef && this.navbarMenuRef.nativeElement) {
          RendererService.updateStyles(this.navbarMenuRef, {width: '0'}, this.renderer);
         //  this.renderer.setStyle(this.navbarMenuRef.nativeElement, 'display', 'none');
        }
      }
    }
  }

  ngOnDestroy() {
    this.bkp.ngOnDestroy();
  }
}

