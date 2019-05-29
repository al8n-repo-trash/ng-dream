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
