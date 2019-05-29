import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import {NdCardBodyComponent, NdCardComponent, NdCardFooterComponent} from './card.component';
import { NdCardHeaderComponent } from './card.component';
import { NdCardAvatarComponent } from './nd-card-avatar.component';

// directives
import { NdCardContentDirective } from './nd-card-content.directive';
import { NdCardActionsDirective } from './nd-card-actions.directive';
import { NdCardTitleDirective } from './nd-card-title.directive';
import { NdCardSubtitleDirective } from './nd-card-subtitle.directive';
import { NdAvatarCenterDirective, NdAvatarEndDirective, NdAvatarStartDirective} from './nd-align.directive';
import {NdCardImgDirective} from './nd-card-img.directive';



const CARD_COMPONENTS = [
  NdCardComponent,
  NdCardAvatarComponent,
  NdCardHeaderComponent,
  NdCardFooterComponent,
  NdCardBodyComponent,
];

const CARD_DIRECTIVES = [
  NdCardContentDirective,
  NdCardActionsDirective,
  NdCardTitleDirective,
  NdCardSubtitleDirective,
  NdAvatarStartDirective,
  NdAvatarCenterDirective,
  NdAvatarEndDirective,
  NdCardImgDirective
];

@NgModule({
  declarations: [
    ...CARD_COMPONENTS,
    ...CARD_DIRECTIVES,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...CARD_DIRECTIVES,
    ...CARD_COMPONENTS
  ]
})
export class NdCardModule { }
