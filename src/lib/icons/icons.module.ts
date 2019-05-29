import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdIconsComponent } from './icons.component';
import { NdIconsDirective } from './icons.directive';


const ICONS_DIRECTIVES = [
  NdIconsDirective
];

const ICONS_COMPONENTS = [
  NdIconsComponent
];
@NgModule({
  declarations: [
    ...ICONS_DIRECTIVES,
    ...ICONS_COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...ICONS_COMPONENTS,
    ...ICONS_DIRECTIVES
  ]
})
export class NdIconsModule { }
