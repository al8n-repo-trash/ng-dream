import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewEncapsulation} from '@angular/core';
import {NdTabItemComponent} from '../tab-item/tab-item.component';

@Component({
  selector: 'nd-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {class: 'nd-tab-header'}
})
export class NdTabHeaderComponent implements OnInit {

  private readonly el: HTMLElement;
  @Input() ndTabs: QueryList<NdTabItemComponent>;

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
