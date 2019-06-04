import {InjectionToken} from '@angular/core';
import {StyleMap} from '../core/types/renderer';

interface CustomConfig {
  ndDuration?: number | 'infinite',
  ndMaxStack?: number,
  ndAnimation?: boolean,
  ndPosition?: 'right' | 'center' | 'left',
  ndPauseOnHover?: boolean,
  ndClose?: boolean,
  ndStyle?: StyleMap,
  ndTop?: number
}

export class ToastData {
  text?: string;
  type?: ToastType = 'default';
  config?: CustomConfig;
}

export const DEFAULT_CUSTOM_CONFIG = {
  ndAnimation: true,
  ndDuration: 5000,
  ndPosition: 'center',
  ndPauseOnHover: true,
  ndClose: false,
  ndMaxStack: 5,
  ndStyle: {},
  ndTop: 80
};

export type ToastType = 'border' | 'default' | 'ghost';

export type FromFuncType = 'primary' | 'info' | 'secondary' | 'loading' | 'danger' | 'warning' | 'success' | 'forbidden';

export class FromFunc {
  function: FromFuncType;
}

export class ToastMaxStack {
  maxStack: number;
}

export interface ToastConfig {
  position?: {
    top: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

export const DefaultToastConfig: ToastConfig = {
  position: {
    top: 20,
    right: 20,
  },
  animation: {
    fadeOut: 2500,
    fadeIn: 300,
  },
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('nd-toast-config');
