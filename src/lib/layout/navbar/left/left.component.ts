import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {BreakpointType, CustomBreakpoint} from '../../../core/types/layout';
import {LayoutService} from '../../../core/service/layout.service';

@Component({
  selector: 'nd-navbar-left',
  exportAs: 'ndNavbarLeft',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-navbar-left'}
})
export class NdNavbarLeftComponent implements OnInit, AfterViewInit {
  // the current HTMLElement
  private readonly el: HTMLElement;

  // the breakpoint whether show the right
  private realBKP: string;

  // the flag of current layout state
  public bkpScreen: boolean = true;

  // listen the window size
  private bkp: BreakpointObserver;

  // custom the breakpoint
  @Input() ndBreakpoint: BreakpointType | CustomBreakpoint = 'sm';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.bkp = this.breakpointObserver;
    this.realBKP = LayoutService.dealBreakpoint(this.ndBreakpoint);
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.bkp
      .observe([this.realBKP])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.bkpScreen = true;
          this.renderer.removeStyle(this.el, 'margin');
          this.renderer.removeStyle(this.el, 'width');
          this.renderer.removeStyle(this.el, 'justify-content');
        } else {
          this.bkpScreen = false;
          this.renderer.setStyle(this.el, 'margin', 'auto 20px');
          this.renderer.setStyle(this.el, 'width', '100%');
          this.renderer.setStyle(this.el, 'justify-content', 'center');
        }
      })
  }
}
