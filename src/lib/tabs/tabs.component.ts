/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

/** get some code from https://github.com/angular/material2 */
/** get some code from https://github.com/NG-ZORRO/ng-zorro-antd */

import {
  AfterContentChecked, AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild, ContentChildren,
  ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  QueryList,
  Renderer2, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TabMode, TabPosition, TabSize} from '../core/types/tabs';
import {NdTabItemComponent} from './tab-item/tab-item.component';
import {NdTabInkBarComponent} from './tab-header/ink-bar/ink-bar.component';
import {RendererService} from '../core/service/renderer.service';
import {NdTabHeaderComponent} from './tab-header/tab-header.component';
import {NdTabLabelComponent} from './tab-header/tab-list/tab-label/tab-label.component';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'nd-tabs',
  exportAs: 'ndTabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'nd-tabs',
    '[class.nd-tabs-position-top]': 'ndPosition === "top"',
    '[class.nd-tabs-position-left]': 'ndPosition === "left"',
    '[class.nd-tabs-position-bottom]': 'ndPosition === "bottom"',
    '[class.nd-tabs-position-right]': 'ndPosition === "right"'
  } // tslint:disable-line:use-host-property-decorator
})
export class NdTabsComponent
  implements
    OnInit,
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    OnDestroy {

  public readonly el: HTMLElement;

  public offset: number = 0;
  public width: number = 0;
  public height: number = 0;
  public tabItems: NdTabItemComponent[];


  @Input() ndPosition: TabPosition = 'top';
  @Input() ndSelectedIndex: number = 0;
  @Input() ndLabelHeight: number;
  @Input() ndLabelWidth: number;
  @Input() ndLabelSize: TabSize = 'default';
  @Input() ndLabelMode: TabMode = 'auto';
  @Input() ndBodyHeight: number;
  @Input() ndBodyWidth: number;

  /**
   * header
   */
  @ViewChild(NdTabHeaderComponent) header: NdTabHeaderComponent;


  /**
   * tab font color
   */
  @Input() ndTabColor: string;
  @Input() ndTabActiveColor: string;
  @ViewChildren(NdTabLabelComponent) _labels: QueryList<NdTabLabelComponent>;
  private _labelsList: NdTabLabelComponent[];

  /**
   * ink bar style params
   */
  @Input() ndInkBarColor: string;
  @ViewChild(NdTabInkBarComponent) inkBar: NdTabInkBarComponent;
  private inkBarEl: HTMLElement;

  @ContentChildren(NdTabItemComponent) _tabs: QueryList<NdTabItemComponent>;

  @Output() readonly ndSelectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {}

  ngAfterContentInit() {
    if (this.ndInkBarColor) {
      RendererService.updateStyles(this.el, {'background-color': this.ndInkBarColor}, this.renderer);
    }
    this.changeDetectorRef.detectChanges();
    this.tabItems = this._tabs.toArray();
  }

  ngAfterViewInit() {
    this._labelsList = this._labels.toArray();
    this.width = this.el.clientWidth;
    this.height = this.el.offsetHeight;

    this.inkBarEl = this.inkBar['el']; // tslint:disable-line:no-string-literal
    this.setInkBarPosition(this.ndSelectedIndex);
    this.changeDetectorRef.detectChanges();
  }


  /**
   * activate label
   * @param idx
   */
  public changeLabel(idx: number): void {
    if (this.ndSelectedIndex === idx) {
      return;
    } else {
      this.ndSelectedIndex = idx;
      this.setInkBarPosition(idx);
    }
  }

  private setInkBarPosition(idx: number): void {
    // tslint:disable-next-line:no-string-literal
    const tmpTab = this._labels.toArray()[this.ndSelectedIndex]['el'] as HTMLElement;

    if (this.ndPosition === 'top' || this.ndPosition === 'bottom') {
      this.moveHorizontalInkBar(tmpTab, idx);
    } else if (this.ndPosition === 'left' || this.ndPosition === 'right') {
      if (this.ndLabelMode === 'auto') {
        RendererService.updateStyles(this.inkBarEl, {
          top: `${(this.ndLabelHeight ? this.ndLabelHeight : this.initLabelVerticalHeight()) * idx}px`,
          height: `${this.ndLabelHeight ? this.ndLabelHeight + 'px' : `${this.initLabelVerticalHeight()}px`}`
        }, this.renderer);
      } else if (this.ndLabelMode === 'fixed') {
        this.moveVerticalInkBar(tmpTab, idx);
      }
    }
  }

  public initLabelHorizontalHeight(): number {
    if (this.ndPosition === 'top' || this.ndPosition === 'bottom') {
      if (this.ndLabelHeight) {
        return this.ndLabelHeight;
      } else {
        if (this.ndLabelSize === 'small') {
          return 30;
        } else if (this.ndLabelSize === 'large') {
          return 56;
        } else {
          return 48;
        }
      }
    }
  }

  private calculateInkBarOffsetLeft(idx: number): number {
    let left: number = 0;
    for (let i = 0; i < idx; i++) {
      left = left + this._labelsList[i]['el']['clientWidth']; // tslint:disable-line:no-string-literal
    }
    return left;
  }

  private moveHorizontalInkBar(el: HTMLElement, idx: number): void {
    RendererService.updateStyles(this.inkBarEl, {
      left: `${this.calculateInkBarOffsetLeft(idx)}px`,
      'min-width': `${el.clientWidth}px`
    }, this.renderer);
  }

  private calculateInkBarOffsetTop(idx: number): number {
    let top: number = 0;
    for (let i = 0; i < idx; i++) {
      top = top + this._labelsList[i]['el']['clientHeight']; // tslint:disable-line:no-string-literal
    }
    return top;
  }

  private moveVerticalInkBar(el: HTMLElement, idx: number): void {
    RendererService.updateStyles(this.inkBarEl, {
      top: `${this.calculateInkBarOffsetTop(idx)}px`,
      'min-height': `${el.clientHeight > el.children[1].clientHeight ? el.clientHeight : el.children[1].clientHeight}px`
    }, this.renderer);
  }

  private initLabelVerticalHeight(): number {
    if (this.ndPosition === 'left' || this.ndPosition === 'right') {
      if (this.ndLabelHeight) {
        return this.ndLabelHeight;
      } else {
        if (this.ndLabelSize === 'small') {
          return 30;
        } else if (this.ndLabelSize === 'large') {
          return 48;
        } else {
          return 36;
        }
      }
    }
  }


  ngOnDestroy() {
  }
}
