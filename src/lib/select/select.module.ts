import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdSelectComponent } from './select.component';
import {OverlayModule} from '@angular/cdk/overlay';

const COMPONENTS = [
  NdSelectComponent
];

const DIRECTIVES = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class NdSelectModule { }
