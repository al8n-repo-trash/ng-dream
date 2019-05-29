import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  host: {class: 'nd-content'},
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NdContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
