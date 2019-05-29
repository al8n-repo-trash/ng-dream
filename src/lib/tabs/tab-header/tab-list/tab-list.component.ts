import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {class: 'nd-tab-list'}
})
export class NdTabListComponent implements OnInit {

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
