import {InjectionToken} from '@angular/core';
import {StyleMap} from '../core/types/renderer';
import {Subject} from 'rxjs';
import {ToastOverlayRef} from './overlay-ref';

export interface CustomConfig {
  ndAnimation?: boolean,
  ndClose?: boolean,
  ndDuration?: number | 'infinite',
  ndMaxStack?: number,
  ndPauseOnHover?: boolean,
  ndPosition?: ToastPostionConfig,
  ndStyle?: StyleMap,
  ndTop?: number,
  ndType?: ToastType;
}

export class ToastData {
  text?: string;
  config?: CustomConfig;
}

export type ToastPostionConfig = ToastPosition | {position: ToastPosition, distance?: number};

export type ToastPosition = 'right' | 'center' | 'left';

export type ToastType = 'alert' | 'normal';

export type FromFuncType = 'primary' | 'info' | 'secondary' | 'loading' | 'danger' | 'warning' | 'success' | 'forbidden' | 'normal';

export class FromFunc {
  function: FromFuncType;
}

export interface ToastSubject {
  toastOverlayRef: ToastOverlayRef,
  onClose?: Subject<boolean>
}

export interface ToastConfig {
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

export const DefaultToastConfig: ToastConfig = {
  animation: {
    fadeOut: 2500,
    fadeIn: 300,
  },
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('nd-toast-config');
