import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NdNavbarCenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
