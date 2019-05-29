import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {AvatarType} from '../core/types/avatar';
import {RendererService} from '../core/service/renderer.service';

@Component({
  selector: 'nd-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-avatar'}
})
export class NdAvatarComponent implements OnInit {
  @Input() ndAvatarUrl: string;
  @Input() ndType: AvatarType = 'circle';
  @Input() ndSize: number | string;
  // @Input() ndStyle: {};

  private readonly el: HTMLElement;
  private borderRadius: number = 4;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.dealSize();
    this.dealType();
  }

  private dealType(): void {
    if (!this.ndType || this.ndType === 'circle') {
      return
    }

    if (this.ndType === 'rect') {
      RendererService.updateStyles(this.el, {'border-radius': 0}, this.renderer);
      return;
    }

    if (this.ndType === 'rounded') {
      RendererService.updateStyles(this.el, {'border-radius': `${this.borderRadius}px`}, this.renderer);
      return;
    }
  }

  private dealSize(): void {
    if (this.ndSize && typeof this.ndSize === 'number') {
      RendererService.updateStyles(this.el, {width: `${this.ndSize}px`, height: `${this.ndSize}px`}, this.renderer);
      return;
    }

    if (this.ndSize && typeof this.ndSize === 'string') {
      RendererService.updateStyles(this.el, {width: this.ndSize, height: this.ndSize}, this.renderer);
      return;
    }
  }
}
