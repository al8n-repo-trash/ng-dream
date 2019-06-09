/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */
import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  QueryList, Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {NdOptionComponent} from './option/option.component';
import {NdSelectType} from '../../core/types/select';


@Component({
  selector: 'nd-select',
  exportAs: 'ndSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NdSelectComponent implements OnInit, AfterContentInit {
  @Input() ndType: NdSelectType = 'line';
  @Input('ngModel') currentValue: any;
  @ContentChildren(NdOptionComponent) private _tabs: QueryList<NdOptionComponent>;
  @HostBinding('class.nd-select-line') _type: boolean = this.ndType === 'line';

  private _el: HTMLElement;

  public optionList: NdOptionComponent[];
  public isOpen: boolean = false;
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.optionList = this._tabs.toArray();
    console.log(this.optionList);
    console.log(this._elementRef);
  }

  public openOptionList() {
    this.isOpen = !this.isOpen;
  }
}
