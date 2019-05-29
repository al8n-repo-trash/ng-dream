import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdExampleViewerComponent } from './example-viewer/example-viewer.component';

const COMPONENTS = [
  NdExampleViewerComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class NdShareModule { }
