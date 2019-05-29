import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdDragDirective } from './drag.directive';
import { NdDropDirective } from './drop.directive';
import {DragDropService} from './drag-drop.service';

const DIRECTIVES = [
  NdDragDirective,
  NdDropDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...DIRECTIVES
  ],
  providers: [
    DragDropService
  ]
})
export class NdDirectiveModule { }
