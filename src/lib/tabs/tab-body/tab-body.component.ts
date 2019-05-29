import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nd-tab-body',
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

export class NdTabBodyComponent implements OnInit, AfterViewInit {
  @Input() content: TemplateRef<void>;
  @Input() active = false;
  @Input() forceRender = false;
  @Input() index: number;
  @Input() clientWidth: number;

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

  ngAfterViewInit() {

  }
}
