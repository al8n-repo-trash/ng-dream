import {TemplateRef, Type} from '@angular/core';
import {Subject} from 'rxjs';
import {OverlayRef} from '@angular/cdk/overlay';

export interface SelectOverCloseEvent<T = any> {
    type: 'backdropClick' | 'close';
    data: T;
}

export type OverContent = TemplateRef<any> | Type<any> | string;

export class SelectOverRef<T = any> {
  private _afterClosed = new Subject<SelectOverCloseEvent<T>>();
  afterClosed$ = this._afterClosed.asObservable();

  constructor(
    public overlay: OverlayRef,
    public content: OverContent,
    public data: T
  ) {
    overlay.backdropClick().subscribe(() => {
      this._close('close', data);
    })
  }

  close(data?: T) {
    this._close('close', data);
  }

  private _close(type: SelectOverCloseEvent['type'], data?: T) {
    this.overlay.dispose();
    this._afterClosed.next({
      type,
      data
    });
    this._afterClosed.complete();
  }
}
