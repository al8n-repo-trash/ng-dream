import {Inject, Injectable, Injector} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {NdToastComponent} from '../../toast/toast.component';
import {CustomConfig, FromFunc, FromFuncType, TOAST_CONFIG_TOKEN, ToastConfig, ToastData, ToastPosition, ToastSubject} from '../../toast/toast-config';
import {ToastOverlayRef} from '../../toast/overlay-ref';

@Injectable({
  providedIn: 'root'
})
export class NdToastService {
  private _init: boolean = false;
  private _config: CustomConfig = {
    ndAnimation: true,
    ndDuration: 5000,
    ndPosition: 'center',
    ndPauseOnHover: true,
    ndClose: false,
    ndMaxStack: 5,
    ndStyle: {},
    ndTop: 80,
    ndType: 'default'
  };

  constructor(
    private _overlay: Overlay,
    private _parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private ndToastConfig: ToastConfig
  ) { }

  private _toastDataConstructor(message: string, config: CustomConfig): ToastData {
    return {
      text: message,
      config: config ? config : {}
    };
  }

  public success(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('success'));
  }
  
  public warning(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('warning'));
  }
  
  public danger(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('danger'));
  }
  
  public primary(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('primary'));
  }
  
  public secondary(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('secondary'));
  }
  
  public info(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('info'));
  }
  
  public loading(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('loading'));
  }
  
  public forbidden(message: string, config?: CustomConfig): ToastSubject {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('forbidden'));
  }

  public remove(id: ToastSubject): void {
    id.toastOverlayRef.close();
  }

  private _createFromFunc(type: FromFuncType): FromFunc {
    return { function: type };
  }
  
  private _attach(data: ToastData, fromFunc: FromFunc): ToastSubject {
    data.config = {
      ...this._config,
      ...data.config
    };

    const positionStrategy = this._getPositionStrategy(data.config.ndPosition);

    // create an overlay
    const overlayRef = this._overlay.create({positionStrategy});

    /**
     * attach it to the overlay container.
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

    overlayRef.attach(toastPortal);

    if (overlayWrapper.children.length <= data.config.ndMaxStack) {
      if (!this._init) {
        this._init = true;
        overlayWrapper.style.paddingTop = `${data.config.ndTop}px`;
      }
    } else {
      overlayWrapper.removeChild(overlayWrapper.childNodes[0]);
    }
    return { toastOverlayRef: toastOverlayRef };
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
    tokens.set(ToastOverlayRef, toastOverlayRef);
    return new PortalInjector(parentInjector, tokens);
  }

  private _getPositionStrategy(position: ToastPosition) {
    if (position === 'center') {
      return this._overlay
        .position()
        .global()
        .centerHorizontally();
    } else if (position === 'right') {
      return this._overlay
        .position()
        .global()
        .right('0px');
    } else if (position === 'left') {
      return this._overlay
        .position()
        .global()
        .left();
    }

  }
}
