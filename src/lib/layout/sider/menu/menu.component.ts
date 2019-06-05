/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Menu, MenuRippleConfig, Type} from '../../../core/types/layout';


@Component({
  selector: 'nd-sider-menu, [ndModel]',
  exportAs: 'ndSiderMenu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NdSiderMenuComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() ndModel: Menu[] = [];
  @Input() ndSiderType: Type = 'default';
  @Input() ndMenuRippleConfig: MenuRippleConfig = {
    opacity: .4,
    color: '#000000',
    duration: .4,
    boxShadow: 'none',
    size: 200
  };

  @Input() ndMenuRipple: boolean = true;
  @HostBinding('class.nd-sider-menu') default = this.ndSiderType === 'default' || null;
  @ViewChildren('submenuItem') submenuItem: QueryList<ElementRef>;
  @ViewChildren('submenu') submenu: QueryList<ElementRef>;
  @ViewChildren('icons') icons: QueryList<ElementRef>;
  private submenuList: ElementRef[];
  private iconList: ElementRef[];
  public opacity: number = .4;
  public color: string = '#000000';
  public duration: number = .4;
  public boxShadow: string = 'none';
  public size: number = 200;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    for (const i in this.ndMenuRippleConfig) {
      if (this.ndMenuRippleConfig.hasOwnProperty(i)) {
        this[i] = this.ndMenuRippleConfig[i];
      }
    }
  }

  ngAfterViewInit() {


    this.submenuList = this.submenu.toArray();
    this.iconList = this.icons.toArray();
    for (let i = 0; i < this.submenuList.length; i++) {
      this.renderer.setAttribute(this.submenuList[i].nativeElement, 'data-id', String(i));
      this.renderer.setStyle(this.submenuList[i].nativeElement, 'display', 'none');
      this.renderer.setAttribute(this.submenuList[i].nativeElement, 'show', 'false');
    }
  }

  ngAfterContentInit() {

  }

  showSubmenu(li: HTMLLIElement) {
    const sibling = li.nextElementSibling;
    const siblingId = Number(sibling.getAttribute('data-id'));

    if (sibling.getAttribute('show') === 'false') {
      this.renderer.setAttribute(sibling, 'show', 'true');
      this.renderer.removeClass(this.iconList[siblingId].nativeElement, 'nd-icon-unfold');
      this.renderer.addClass(this.iconList[siblingId].nativeElement, 'nd-icon-packup');
      this.renderer.setStyle(sibling, 'display', 'block');
    } else if (sibling.getAttribute('show') === 'true') {
      this.renderer.setAttribute(sibling, 'show', 'false');
      this.renderer.removeClass(this.iconList[siblingId].nativeElement, 'nd-icon-packup');
      this.renderer.addClass(this.iconList[siblingId].nativeElement, 'nd-icon-unfold');
      this.renderer.setStyle(sibling, 'display', 'none');
    }
  }
}
