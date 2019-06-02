import {Injectable, Injector} from '@angular/core';
import {ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy} from '@angular/cdk/overlay';
import {SelectOverRef} from '../../select/select-over-ref';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {NdSelectComponent} from '../../select/select.component';

@Injectable({
  providedIn: 'root'
})

export class SelectService {

  constructor(
    private _overlay: Overlay,
    private _injector: Injector
  ) { }

  public open<T>({origin, content, data, width, height}): SelectOverRef<T> {
    const overlayRef = this._overlay.create(this._getOverlayConfig({origin, width, height}));
    const selectOverRef = new SelectOverRef<T>(overlayRef, content, data);
    const injector = SelectService.createInjector(selectOverRef, this._injector);
    overlayRef.attach(new ComponentPortal(NdSelectComponent, null, injector));
    return selectOverRef;
  }

  private _getOverlayConfig({origin, width, height}): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      width,
      height,
      backdropClass: '',
      positionStrategy: this._getOverlayPosition(origin),
      scrollStrategy: this._overlay.scrollStrategies.reposition()
    });
  }

  private _getOverlayPosition(origin: HTMLElement): PositionStrategy {
    return this._overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(SelectService._getPositions())
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  static createInjector(selectOverRef: SelectOverRef, injector: Injector) {
    const tokens = new WeakMap([[SelectOverRef, selectOverRef]]);
    return new PortalInjector(injector, tokens);
  }

  private static _getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }
    ];
  }
}
