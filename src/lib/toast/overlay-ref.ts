import {OverlayRef} from '@angular/cdk/overlay';

export class ToastOverlayRef {
  constructor(readonly overlayRef: OverlayRef) {}

  public close() {
    this.overlayRef.dispose();
  }

  public isVisible() {
    return this.overlayRef && this.overlayRef.overlayElement;
  }

  public getPosition() {
    return this.overlayRef.overlayElement.getBoundingClientRect();
  }
}
