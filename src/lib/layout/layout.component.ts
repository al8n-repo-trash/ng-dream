/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChild, ElementRef,
  OnChanges, OnDestroy,
  OnInit, Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';


@Component({
  selector: 'nd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {class: 'nd-layout'}
})

export class NdLayoutComponent implements OnInit, AfterViewInit, OnChanges, AfterContentInit, OnDestroy {
  private readonly el: HTMLElement;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @ViewChild('main', {static: false}) mainEl: ElementRef;
  @ViewChild('mask', {static: false}) maskEl: ElementRef;

  ngOnChanges() {

  }
  ngOnInit() {

  }
  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {

  }


}
