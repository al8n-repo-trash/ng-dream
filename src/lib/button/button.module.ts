import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NdArrowButtonComponent, NdButtonComponent} from './button.component';

import {NdRippleModule} from '../core/ripple/ripple.module';

const COMPONENTS = [
  NdButtonComponent,
  NdArrowButtonComponent
];

const DIRECTIVES = [

];


@NgModule({
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    NdRippleModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class NdButtonModule { }
