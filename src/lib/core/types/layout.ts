import {Input} from '@angular/core';

export type Type = 'default' | 'flat' | 'hero' | 'colorful' | 'raise';

export interface MenuRippleConfig {
  color?: string,
  duration?: number,
  opacity?: number,
  boxShadow?: string,
  size?: number
}

export const Breakpoints = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface CustomBreakpoint {
  type: 'max' | 'min',
  breakpoint: number
}

export interface Navs {
  text: string,
  link?: string,
  subNav?: {
    title?: string,
    text: string,
    link: string
  }[]
}

export interface Menu {
  text?: string,
  link?: string,
  icon?: string,
  submenuList?: {
    title?: string,
    submenu?: {
      text?: string,
      link?: string,
      icon?: string,
      submenuList?: {
        title?: string,
        submenu?: {
          icon?: string,
          text?: string,
          link?: string,
        }[],
      }[],
    }[],
  }[]
}
