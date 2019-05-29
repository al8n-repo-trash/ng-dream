import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {ConfigClass} from './grid-class';
import {NdGridService} from '../core/service/grid.service';
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import {Platform} from '@angular/cdk/platform';
import {auditTime, takeUntil} from 'rxjs/operators';
import {fromEvent, Observable, Subject} from 'rxjs';

import { Breakpoints } from '../core/types/layout';


@Component({
  selector: '[nd-row], nd-row',
  exportAs: 'ndRow',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./grid.component.scss'],
  providers: [NdGridService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NdGridRowComponent implements OnInit, AfterViewInit {
  @Input() ndAlign: 'top' | 'middle' | 'bottom' = 'top';
  @Input() ndJustify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' = 'start';
  @Input() ndType: 'flex' | null;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


}

@Component({
  selector: '[nd-col], nd-col',
  exportAs: 'ndCol',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./grid.component.scss'],
  providers: [NdGridService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NdGridColComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() ndSpan: string | number;
  @Input() ndOffset: string | number;
  @Input() ndPush: string | number;
  @Input() ndPull: string | number;
  @Input() ndOrder: string | number;
  @Input() ndGutter: string | number;
  @Input() ndGutterConfig: ConfigClass;
  @Input() ndSpanConfig: ConfigClass;
  @Input() ndOffsetConfig: ConfigClass;
  @Input() ndPushConfig: ConfigClass;
  @Input() ndPullConfig: ConfigClass;
  @Input() ndOrderConfig: ConfigClass;

  private gutter: number;
  private gutter$ = new Subject<number>();
  private destroy$ = new Subject();
  private windowSize$: Observable<number>;
  private readonly el: HTMLElement;
  private xxl: MediaQueryList;
  private md: MediaQueryList;

  private prefix = 'nd-col-';
  constructor(
    private elementRef: ElementRef,
    private gridService: NdGridService,
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    private mediaMatcher: MediaMatcher,
    private platform: Platform,
    private ngZone: NgZone,
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnChanges() {
    this.init();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // if (this.platform.isBrowser) {
    //   this.ngZone.runOutsideAngular(() => {
    //     fromEvent(window, 'resize')
    //       .pipe(
    //         auditTime(16),
    //         takeUntil(this.destroy$)
    //       )
    //       .subscribe(() => {
    //         this.watchMedia();
    //       });
    //   })
    // }
    fromEvent(window, 'resize')
      .pipe(
        auditTime(16),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log(innerWidth);
      })
  }

  private init() {
    this.dealSpan(`${this.prefix}`);
    this.dealOffset(`${this.prefix}offset-`);
    this.dealPull(`${this.prefix}pull-`);
    this.dealPush(`${this.prefix}push-`);
    this.dealOrder(`${this.prefix}order-`);
    this.dealSpanConfig();
    this.dealOffsetConfig();
    this.dealPullConfig();
    this.dealPushConfig();
    this.dealOrderConfig();
  }

  private dealGutter() {

  }

  private dealSpan(prefix: string) {
    this.gridService.dealInput(this.el, prefix, this.ndSpan);
  }

  private dealOffset(prefix: string) {
    this.gridService.dealInput(this.el, prefix, this.ndOffset);
  }

  private dealPull(prefix: string) {
    this.gridService.dealInput(this.el, prefix, this.ndPull);
  }

  private dealPush(prefix: string) {
    this.gridService.dealInput(this.el, prefix, this.ndPush);
  }
  
  private dealOrder(prefix: string) {
    this.gridService.dealInput(this.el, prefix, this.ndOrder);
  }
  
  private dealSpanConfig() {
    this.gridService.dealConfig(this.el, `${this.prefix}`, this.ndSpanConfig);
  }

  private dealOffsetConfig() {
    this.gridService.dealConfig(this.el, `${this.prefix}offset-`, this.ndOffsetConfig);
  }

  private dealPullConfig() {
    this.gridService.dealConfig(this.el, `${this.prefix}pull-`, this.ndPullConfig);
  }

  private dealPushConfig() {
    this.gridService.dealConfig(this.el, `${this.prefix}push-`, this.ndPushConfig);
  }

  private dealOrderConfig() {
    this.gridService.dealConfig(this.el, `${this.prefix}order-`, this.ndOrderConfig);
  }

  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy();
  }
}
