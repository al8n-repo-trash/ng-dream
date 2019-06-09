import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdSelectComponent } from './select.component';
import { NdOptionComponent } from './option/option.component';
import {FormsModule} from '@angular/forms';

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
    CommonModule,
    FormsModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})

export class NdSelectModule { }
