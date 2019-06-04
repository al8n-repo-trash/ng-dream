import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdToastComponent } from './toast.component';
import { NdToastService } from '../core/service/toast.service';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {DefaultToastConfig, TOAST_CONFIG_TOKEN} from './toast-config';
import {config} from 'rxjs';
import {NdIconsModule} from '../icons/icons.module';


const COMPONENTS = [
  NdToastComponent
];

const DIRECTIVES = [];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    NdIconsModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [
    {
      provide: TOAST_CONFIG_TOKEN,
      useValue: {...DefaultToastConfig, ...config},
    }
  ],
  entryComponents: [NdToastComponent]
})
export class NdToastModule { }
