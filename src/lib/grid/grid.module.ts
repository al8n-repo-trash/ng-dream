import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NdGridColComponent, NdGridRowComponent} from './grid.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';


const GRID_COMPONENTS = [
  NdGridColComponent,
  NdGridRowComponent
];

const GRID_DIRECTIVES = [
];

@NgModule({
  declarations: [
    ...GRID_COMPONENTS,
    ...GRID_DIRECTIVES
  ],
  imports: [
    CommonModule,
    LayoutModule,
    PlatformModule
  ],
  exports: [
    ...GRID_COMPONENTS,
    ...GRID_DIRECTIVES
  ]
})
export class NdGridModule { }
