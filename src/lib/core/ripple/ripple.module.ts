import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdRippleDirective } from './ripple.directive';

@NgModule({
  declarations: [NdRippleDirective],
  imports: [
    CommonModule
  ],
  exports: [
    NdRippleDirective
  ]
})
export class NdRippleModule { }
