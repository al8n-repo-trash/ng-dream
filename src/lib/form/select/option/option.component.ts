import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-option',
  exportAs: 'ndOption',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-option-item'}
})

export class NdOptionComponent implements OnInit {

  @Input() ndValue: string;
  @Input() ndLabel: string;

  constructor() { }

  ngOnInit() {
  }

}
