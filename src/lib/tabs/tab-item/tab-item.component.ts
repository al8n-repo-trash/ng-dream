import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nd-tab-item',
  exportAs: 'ndTabItem',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NdTabItemComponent implements OnInit {

  private readonly el: HTMLElement;
  @ViewChild(TemplateRef) content: TemplateRef<void>;
  @Input('ndLabel') textLabel: string = ''; // tslint:disable-line:no-input-rename
  @Input() ndDisabled: boolean = false; // tslint:disable-line:no-input-rename

  @Output() readonly ndClick = new EventEmitter<void>();

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
