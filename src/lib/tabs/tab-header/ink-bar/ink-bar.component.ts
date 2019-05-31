import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {TabPosition} from '../../../core/types/tabs';


@Component({
  selector: 'nd-tab-ink-bar',
  exportAs: 'ndTabInkBar',
  templateUrl: './ink-bar.component.html',
  styleUrls: ['./ink-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {class: 'nd-tab-ink-bar'}
})
export class NdTabInkBarComponent implements OnInit {

  private readonly el: HTMLElement;




  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
  }

}
