import {Inject, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {NdToastComponent} from '../../toast/toast.component';
import {DEFAULT_CUSTOM_CONFIG, FromFunc, FromFuncType, TOAST_CONFIG_TOKEN, ToastConfig, ToastData, ToastMaxStack} from '../../toast/toast-config';
import {ToastOverlayRef} from '../../toast/overlay-ref';


@Injectable({
  providedIn: 'root'
})
export class NdToastService {
  private _lastToast: ToastOverlayRef;
  private counter: number = 0;

  constructor(
    private _overlay: Overlay,
    private _parentInjector: Injector,
    // private _overlayRef: OverlayRef,
    @Inject(TOAST_CONFIG_TOKEN) private ndToastConfig: ToastConfig
  ) { }

  public success(data: ToastData) {
    this._attach(data, this._createFromFunc('success'));
  }
  
  public warning(data: ToastData) {
    this._attach(data, this._createFromFunc('warning'));
  }
  
  public danger(data: ToastData) {
    this._attach(data, this._createFromFunc('danger'));
  }
  
  public primary(data: ToastData) {
    this._attach(data, this._createFromFunc('primary'));
  }
  
  public secondary(data: ToastData) {
    this._attach(data, this._createFromFunc('secondary'));
  }
  
  public info(data: ToastData) {
    this._attach(data, this._createFromFunc('info'));
  }
  
  public loading(data: ToastData) {
    this._attach(data, this._createFromFunc('loading'));
  }
  
  public forbidden(data: ToastData) {
    this._attach(data, this._createFromFunc('forbidden'));
  }
  
  private _createFromFunc(type: FromFuncType): FromFunc {
    return { function: type };
  }
  
  private _attach(data: ToastData, fromFunc: FromFunc): ToastOverlayRef {
    const positionStrategy = this._getPositionStrategy();
    // create an overlay
    const overlayRef = this._overlay.create({positionStrategy});

    /**
     * pass in the overlay reference and
     * only expose the close method that
     * will call dispose and will pass
     * it to the toast component so it
     * can close itself
     */
    const toastOverlayRef = new ToastOverlayRef(overlayRef);

    const overlayWrapper = toastOverlayRef.overlayRef.hostElement.parentElement;

    // add relevant dependency
    const injector = this._getInjector(data, fromFunc, toastOverlayRef, this._parentInjector);

    // create an instance of toast
    // component with injector attached
    const toastPortal = new ComponentPortal(NdToastComponent, null, injector);

    const config = {
      ...DEFAULT_CUSTOM_CONFIG,
      ...data.config
    };

    overlayRef.attach(toastPortal);

    if (this.counter <= config.ndMaxStack - 1) {
      if (this.counter === 0) {
        overlayWrapper.style.paddingTop = `${config.ndTop}px`;
      }

      // attach it to the overlay container
      this.counter++;
      return toastOverlayRef;
    } else {

      overlayWrapper.removeChild(overlayWrapper.childNodes[0]);
      return toastOverlayRef;
    }

  }

  private _getInjector(data: ToastData, fromFunc: FromFunc, toastOverlayRef: ToastOverlayRef, parentInjector: Injector) {
    /**
     * create a map with the custom tokens we want
     * to add in the injector and then instantiate
     * the PortalInjector
     */
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(FromFunc, fromFunc);
    // tokens.set(ToastMaxStack, this.counter);
    tokens.set(ToastOverlayRef, toastOverlayRef);
    return new PortalInjector(parentInjector, tokens);
  }

  private _getPositionStrategy() {
    return this._overlay
      .position()
      .global();
      // .centerHorizontally()
      // .centerVertically();
      // .top(this.getPosition())
      // .right(this.ndToastConfig.position.right + 'px');
  }

  private _getPosition() {
    const lastToastIsVisible = this._lastToast && this._lastToast.isVisible();
    const position = lastToastIsVisible ? this._lastToast.getPosition().bottom : this.ndToastConfig.position.top;
    return position + 'px';
  }
}
