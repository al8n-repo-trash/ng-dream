import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdLayoutMultifunctionalComponent } from './layout-multifunctional.component';
import {RendererService} from '../core/service/renderer.service';
import {NdMenuStaticComponent} from './menu/static/static.component';
import {NdMenuSlimComponent} from './menu/slim/slim.component';
import {NdMenuOverlayComponent} from './menu/overlay/overlay.component';
import {NdMenuHorizontalComponent} from './menu/horizontal/horizontal.component';

const COMPONENTS = [
  NdLayoutMultifunctionalComponent,
  NdMenuHorizontalComponent,
  NdMenuOverlayComponent,
  NdMenuSlimComponent,
  NdMenuStaticComponent
];

const DIRECTIVES = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [RendererService]
})
export class NdLayoutMultifunctionalModule { }
