import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NdSliderButtonDirective, NdSliderComponent} from './slider.component';
import { NdSliderGalleryComponent } from './slider-gallery/slider-gallery.component';

const SLIDER_DIRECTIVES = [
  NdSliderButtonDirective
];

const SLIDER_COMPONENTS = [
  NdSliderComponent,
];

@NgModule({
  declarations: [
    ...SLIDER_COMPONENTS,
    ...SLIDER_DIRECTIVES,
    NdSliderGalleryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...SLIDER_DIRECTIVES,
    ...SLIDER_COMPONENTS
  ]
})
export class NdSliderModule { }
