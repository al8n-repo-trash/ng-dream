import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdLayoutComponent } from './layout.component';
import { NdSiderComponent } from './sider/sider.component';
import { NdSiderSecondaryComponent } from './sider-secondary/sider-secondary.component';
import { NdNavbarComponent } from './navbar/navbar.component';
import { NdNavbarCenterDirective} from './navbar/navbar.directive';
import { NdNavbarLeftComponent } from './navbar/left/left.component';
import { NdNavbarRightComponent } from './navbar/right/right.component';
import { NdNavbarCenterComponent } from './navbar/center/center.component';
import { NdSiderMenuComponent } from './sider/menu/menu.component';
import { NdIconsModule } from '../icons/icons.module';
import { NdContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { NdRippleModule } from '../core/ripple/ripple.module';
import { NdMaskModule } from '../core/mask/mask.module';
import {NdMaskComponent} from '../core/mask/mask.component';



const LAYOUT_COMPONENTS = [
  NdLayoutComponent,
  NdSiderComponent,
  NdSiderSecondaryComponent,
  NdNavbarComponent,
  NdNavbarLeftComponent,
  NdNavbarRightComponent,
  NdNavbarCenterComponent,
  NdSiderMenuComponent,
  NdContentComponent,
];
const LAYOUT_DIRECTIVES = [
  NdNavbarCenterDirective
];

@NgModule({
  declarations: [
    ...LAYOUT_COMPONENTS,
    ...LAYOUT_DIRECTIVES
  ],
  imports: [
    CommonModule,
    NdIconsModule,
    RouterModule,
    NdRippleModule,
    NdIconsModule,
    NdMaskModule
  ],
  exports: [
    ...LAYOUT_COMPONENTS,
    ...LAYOUT_DIRECTIVES
  ],
  entryComponents: [
    NdMaskComponent
  ]
})
export class NdLayoutModule { }
