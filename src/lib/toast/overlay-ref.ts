import {OverlayRef} from '@angular/cdk/overlay';

export class ToastOverlayRef {
  constructor(readonly overlayRef: OverlayRef) {}

  public close() {
    this.overlayRef.dispose();
  }

}
