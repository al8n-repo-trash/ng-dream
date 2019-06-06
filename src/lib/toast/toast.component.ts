import {AfterViewInit, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FromFunc, TOAST_CONFIG_TOKEN, ToastConfig, ToastData} from './toast-config';
import {ToastOverlayRef} from './overlay-ref';
import {toastAnimations, ToastAnimationState} from './toast-animation';
import {RendererService} from '../core/service/renderer.service';

@Component({
  selector: 'nd-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast],
  host: {
    class: 'nd-toast-container',
  }
})

export class NdToastComponent implements OnInit, OnDestroy, AfterViewInit {
  public animationState: ToastAnimationState = 'default';
  private _intervalId: any;
  private _existTime: number;
  private _startTime: number;

  @HostBinding('class.nd-toast-alert') public alert: boolean = this.toastData.config.ndType === 'alert';
  @HostBinding('class.nd-toast-normal') public normal: boolean = this.toastData.config.ndType === 'normal';

  @ViewChild('toast', {static: false}) private _toastContent: ElementRef;

  constructor(
    public renderer: Renderer2,
    readonly toastData: ToastData,
    readonly fromFunc: FromFunc,
    readonly toastOverlayRef: ToastOverlayRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {
  }

  ngOnInit() {
    this._startTime = +new Date();
    if (this.toastData.config.ndDuration !== 'infinite') {
      this._intervalId = setTimeout(() => this.animationState = 'closing', 3000);
    }
  }

  ngAfterViewInit() {
    this._pause();
  }

  ngOnDestroy() {
    clearTimeout(this._intervalId);
  }

  private _pause() {
    if (this.toastData.config.ndPauseOnHover && this.toastData.config.ndDuration !== 'infinite') {
      RendererService.addlistener(this._toastContent, 'mouseenter', () => {
        this._existTime = +new Date() - this._startTime;
        clearTimeout(this._intervalId);
      }, this.renderer);

      RendererService.addlistener(this._toastContent, 'mouseleave', () => {
        this._startTime = +new Date();
        const newDuration: number = (this.toastData.config.ndDuration as any) - this._existTime;
        this._intervalId = setTimeout(() => this.animationState = 'closing', newDuration);
        this._existTime = undefined;
      }, this.renderer);
    }
  }

  public close() {
    this.toastOverlayRef.close();
  }

  onFadeFinished(event: any) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';
    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
