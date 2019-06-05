import {InjectionToken} from '@angular/core';
import {StyleMap} from '../core/types/renderer';

export interface CustomConfig {
  ndAnimation?: boolean,
  ndClose?: boolean,
  ndDuration?: number | 'infinite',
  ndMaxStack?: number,
  ndPauseOnHover?: boolean,
  ndPosition?: ToastPosition,
  ndStyle?: StyleMap,
  ndTop?: number,
  ndType?: ToastType;
}

export class ToastData {
  text?: string;
  config?: CustomConfig;
}

export type ToastPosition = 'right' | 'center' | 'left';

export type ToastType = 'border' | 'default' | 'ghost';

export type FromFuncType = 'primary' | 'info' | 'secondary' | 'loading' | 'danger' | 'warning' | 'success' | 'forbidden';

export class FromFunc {
  function: FromFuncType;
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
