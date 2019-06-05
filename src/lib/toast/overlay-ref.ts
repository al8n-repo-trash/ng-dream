import {OverlayRef} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';

export class ToastOverlayRef {
  public onClose?: Subject<boolean>;

  constructor(readonly overlayRef: OverlayRef) {}

  public close() {
    this.overlayRef.dispose();
  }

}
