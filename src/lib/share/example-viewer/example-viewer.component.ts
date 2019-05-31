import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {RendererService} from '../../core/service/renderer.service';

@Component({
  selector: 'nd-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {class: 'example-viewer'}
})
export class NdExampleViewerComponent implements OnInit {
  @Input() exampleName: string;
  @ViewChild('sourceContainer') sourceContainer: ElementRef;

  private readonly el: HTMLElement;

  public sourceCode: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {

  }

  public showSourceCode() {
    this.sourceCode = !this.sourceCode;
  }
}
