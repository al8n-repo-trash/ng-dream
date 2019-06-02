import {OverContent} from '../../select/select-over-ref';

export type OverParams<T> = {
  origin: HTMLElement;
  content: OverContent;
  data?: T;
  width?: string | number;
  height: string | number;
};
