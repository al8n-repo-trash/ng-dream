import {Observable} from 'rxjs';
import {NdMaskComponent} from '../mask/mask.component';

export interface MaskRef {
  onClose: Observable<any>,
  instance: NdMaskComponent
}

