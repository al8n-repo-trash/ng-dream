import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-tab-label',
  exportAs: 'ndTabLabel',
  templateUrl: './tab-label.component.html',
  styleUrls: ['./tab-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {class: 'nd-tab-label'} // tslint:disable-line
})
export class NdTabLabelComponent implements OnInit {

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
