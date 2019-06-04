import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FromFunc, TOAST_CONFIG_TOKEN, ToastConfig, ToastData} from './toast-config';
import {ToastOverlayRef} from './overlay-ref';
import {toastAnimations, ToastAnimationState} from './toast-animation';

@Component({
  selector: 'nd-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast],
  host: {class: 'nd-toast-container'}
})

export class NdToastComponent implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';
  private _intervalId: any;

  constructor(
    readonly toastData: ToastData,
    readonly fromFunc: FromFunc,
    readonly toastOverlayRef: ToastOverlayRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {
  }

  ngOnInit() {
    if (this.toastData.config.ndDuration !== 'infinite') {
      this._intervalId = setTimeout(() => this.animationState = 'closing', 3000);
    }
  }

  ngOnDestroy() {
    clearTimeout(this._intervalId);
  }

  public close() {
    this.toastOverlayRef.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';
    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
