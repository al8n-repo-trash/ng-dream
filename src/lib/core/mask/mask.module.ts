import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdMaskDirective } from './mask.directive';
import { NdMaskComponent } from './mask.component';

const COMPONENTS = [
  NdMaskComponent
];

const DIRECTIVES = [
  NdMaskDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class NdMaskModule { }
