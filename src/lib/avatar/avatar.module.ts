import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NdAvatarComponent} from './avatar.component';

const COMPONENTS = [
  NdAvatarComponent
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
export class NdAvatarModule { }
