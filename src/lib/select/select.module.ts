import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdSelectComponent } from './select.component';
import { NdOptionComponent } from './option/option.component';

const COMPONENTS = [
  NdSelectComponent,
  NdOptionComponent
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
  ]
})

export class NdSelectModule { }
