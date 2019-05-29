import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChild, ElementRef,
  OnChanges, OnDestroy,
  OnInit, Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import {Breakpoints} from '../core/types/layout';
import {Router} from '@angular/router';


@Component({
  selector: 'nd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {class: 'nd-layout'}
})

export class NdLayoutComponent implements OnInit, AfterViewInit, OnChanges, AfterContentInit, OnDestroy {
  private readonly el: HTMLElement;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @ViewChild('main') mainEl: ElementRef;
  @ViewChild('mask') maskEl: ElementRef;

  ngOnChanges() {

  }
  ngOnInit() {

  }
  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {

  }


}
