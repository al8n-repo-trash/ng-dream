import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdSelectComponent } from './select.component';

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
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})

export class NdSelectModule { }
