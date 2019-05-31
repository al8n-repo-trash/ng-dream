import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdExampleViewerComponent } from './example-viewer/example-viewer.component';
import { NdExampleViewerBodyComponent } from './example-viewer-body/example-viewer-body.component';

const COMPONENTS = [
  NdExampleViewerComponent,
  NdExampleViewerBodyComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class NdShareModule { }
