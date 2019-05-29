import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NdTabsComponent} from './tabs.component';
import {NdTabHeaderComponent} from './tab-header/tab-header.component';
import {NdTabListComponent} from './tab-header/tab-list/tab-list.component';
import {NdTabLabelComponent} from './tab-header/tab-list/tab-label/tab-label.component';
import {NdTabInkBarComponent} from './tab-header/ink-bar/ink-bar.component';
import {NdTabBodyComponent} from './tab-body/tab-body.component';
import {NdTabItemComponent} from './tab-item/tab-item.component';
import {NdRippleModule} from '../core/ripple/ripple.module';

const COMPONENTS = [
  NdTabsComponent,
  NdTabHeaderComponent,
  NdTabListComponent,
  NdTabLabelComponent,
  NdTabInkBarComponent,
  NdTabBodyComponent,
  NdTabItemComponent
];

const DIRECTIVES = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    NdRippleModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class NdTabsModule { }
