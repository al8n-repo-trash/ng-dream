/**
 * @license
 * Copyright ALiuGuanyan All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/ALiuGuanyan/ng-dream/LICENSE
 */

import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'nd-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NdMaskComponent implements OnInit {


  constructor(

  ) { }

  ngOnInit() {
  }
}
