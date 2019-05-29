import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Type} from '../../core/types/layout';

@Component({
  selector: 'nd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NdNavbarComponent implements OnInit {
  @Input() public ndHeight: string = '80px';
  @Input() public ndNavbarType: Type = 'default';
  @HostBinding('class.nd-navbar-default') default = this.ndNavbarType === 'default' || null;
  constructor() { }

  ngOnInit() {
  }

}
