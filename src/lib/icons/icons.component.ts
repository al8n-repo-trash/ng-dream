/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-icon',
  exportAs: 'ndIcon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-icon-container'}
})
export class NdIconsComponent implements OnInit {
  public icon: string;
  @Input() ndIconType: string;

  constructor() {

  }
  ngOnInit() {
    this.icon = `nd-icon-${this.ndIconType}`;
  }
}
