/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {Inject, Injectable, Injector} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {NdToastComponent} from '../../toast/toast.component';
import {
  CustomConfig,
  FromFunc,
  FromFuncType,
  TOAST_CONFIG_TOKEN,
  ToastConfig,
  ToastData,
  ToastPostionConfig,
  ToastSubject
} from '../../toast/toast-config';
import {ToastOverlayRef} from '../../toast/overlay-ref';
import {Subject} from 'rxjs';
import {DomService} from './dom.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {Platform} from '@angular/cdk/platform';

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
    ndType: 'alert'
  };

  constructor(
    private _overlay: Overlay,
    private _parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private ndToastConfig: ToastConfig,
    private _mediaQuery: MediaMatcher,
    private _platform: Platform
  ) { }

  private _toastDataConstructor(message: string, config: CustomConfig): ToastData {
    return {
      text: message,
      config: config ? config : {}
    };
  }

  public create(message: string, config?: CustomConfig) {
    return this._attach(this._toastDataConstructor(message, config), this._createFromFunc('normal'));
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

    if (data.config.ndStyle) {
      const toastContainer = toastOverlayRef.overlayRef.overlayElement.querySelector('.nd-toast') as HTMLElement;
      DomService.setStyles(toastContainer, data.config.ndStyle);
    }

    if (overlayWrapper.children.length <= data.config.ndMaxStack) {
      if (!this._init) {
        this._init = true;
        overlayWrapper.style.paddingTop = `${data.config.ndTop}px`;
      }
    } else {
      overlayWrapper.removeChild(overlayWrapper.childNodes[0]);
    }
    return {
      toastOverlayRef: toastOverlayRef,
      onClose: new Subject()
    };
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
  // tslint:disable:no-string-literal
  private _getPositionStrategy(position: ToastPostionConfig) {
    if (this._platform.IOS || this._platform.ANDROID) {
      return this._overlay
        .position()
        .global()
        .centerHorizontally();
    } else {
      if (position.hasOwnProperty('position')) {
        if (position['position'] === 'center') {
          return this._overlay
            .position()
            .global()
            .centerHorizontally();
        } else if (position['position'] === 'right') {
          return this._overlay
            .position()
            .global()
            .right(typeof position['distance'] === 'number' ? `${position['distance']}px` : '20px');
        } else if (position['position'] === 'left') {
          return this._overlay
            .position()
            .global()
            .left(typeof position['distance'] === 'number' ? `${position['distance']}px` : '20px');
        }
      } else {
        if (position === 'center') {
          return this._overlay
            .position()
            .global()
            .centerHorizontally();
        } else if (position === 'right') {
          return this._overlay
            .position()
            .global()
            .right('20px');
        } else if (position === 'left') {
          return this._overlay
            .position()
            .global()
            .left('20px');
        }
      }
    }
  }
}
