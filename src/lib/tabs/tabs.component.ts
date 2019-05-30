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
import {merge, Subscription} from 'rxjs';
import {coerceNumberProperty} from '@angular/cdk/coercion';

/** A simple change event emitted on focus or selection changes. */
export class NdTabChangeEvent {
  /** Index of the currently-selected tab. */
  index: number;
  /** Reference to the currently-selected tab. */
  tab: NdTabItemComponent;
}

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


  /** The tab index that should be selected after the content has been checked. */
  private _indexToSelect: number | null = 0;

  /** Subscription to tabs being added/removed. */
  private _tabsSubscription = Subscription.EMPTY;

  /** Subscription to changes in the tab labels. */
  private _tabLabelSubscription = Subscription.EMPTY;

  @Input() ndPosition: TabPosition = 'top';
  // @Input() ndSelectedIndex: number | null = null;

  /** The index of the active tab. */
  @Input()
  get ndSelectedIndex(): number | null { return this._selectedIndex; }
  set ndSelectedIndex(value: number | null) {
    this._indexToSelect = coerceNumberProperty(value, null);
  }
  public _selectedIndex: number | null = null;

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
  /** Event emitted when the tab selection has changed. */
  @Output() readonly ndSelectedTabChange: EventEmitter<NdTabChangeEvent> =
    new EventEmitter<NdTabChangeEvent>(true);

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;

      if (!isFirstRun) {
        this.ndSelectedTabChange.emit(this._createChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);

        if (!isFirstRun) {
          this.ndSelectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: NdTabItemComponent, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this.changeDetectorRef.markForCheck();
    }
  }

  ngAfterContentInit() {
    if (this.ndInkBarColor) {
      RendererService.updateStyles(this.el, {'background-color': this.ndInkBarColor}, this.renderer);
    }

    this.tabItems = this._tabs.toArray();

    this._subscribeToTabLabels();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `selectedIndexChange` event.
            this._indexToSelect = this._selectedIndex = i;
            break;
          }
        }
      }

      this._subscribeToTabLabels();
      this.changeDetectorRef.markForCheck();
    });
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

  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  private _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }

    this._tabLabelSubscription = merge(...this._tabs.map(tab => tab._stateChanges))
      .subscribe(() => this.changeDetectorRef.markForCheck());
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


  /** Clamps the given index to the bounds of 0 and the tabs length. */
  private _clampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }

  private _createChangeEvent(index: number): NdTabChangeEvent {
    const event = new NdTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }

  ngOnDestroy() {
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
  }
}
