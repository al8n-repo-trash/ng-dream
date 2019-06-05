/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {NdMaskComponent} from '../mask/mask.component';
import {Observable, Subscriber} from 'rxjs';
import {MaskRef} from '../types/mask';

@Injectable({
  providedIn: 'root'
})



export class MaskService {
  private modalRef: { [key: string]: any } = {};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
  ) { }

  public openMask(data: {[key: string]: any} = {}): MaskRef {
    let onCloseSubscribe: Subscriber<any>;
    let object: MaskRef;

    object = {
      onClose: new Observable((subscribe) => onCloseSubscribe = subscribe),
      instance: null
    };

    const componentRef = this.createComponent(NdMaskComponent, data, (data1) => {
      onCloseSubscribe.next(data1);
    });

    object.instance = (componentRef as ComponentRef<NdMaskComponent>).instance;

    return object;
  }

  public removeMask() {
    this.modalRef.close();
  }

  private createComponent(component: any, data: any, onClose: (data) => void): ComponentRef<any> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    if (!data) {
      data = {};
    }

    data.close = (data1) => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      if (onClose) {
        onClose(data1);
      }
    };

    Object.assign(componentRef.instance, {modalRef: data});

    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElement);

    return componentRef;
  }
}
