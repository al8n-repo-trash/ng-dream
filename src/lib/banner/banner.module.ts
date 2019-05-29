import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdBannerComponent } from './banner.component';
import { NdBannerFadeComponent } from './fade/fade.component';
import { ScrollComponent } from './scroll/scroll.component';

const BANNER_COMPONENTS = [
  NdBannerComponent,
  NdBannerFadeComponent,
];
const BANNER_DERICTIVES = [];

@NgModule({
  declarations: [
    ...BANNER_COMPONENTS,
    ...BANNER_DERICTIVES,
    ScrollComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...BANNER_DERICTIVES,
    ...BANNER_COMPONENTS
  ]
})
export class NdBannerModule { }
