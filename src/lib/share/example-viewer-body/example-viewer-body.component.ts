import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'nd-example-viewer-body',
  exportAs: 'ndExampleViewerBody',
  templateUrl: './example-viewer-body.component.html',
  styleUrls: ['./example-viewer-body.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NdExampleViewerBodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
