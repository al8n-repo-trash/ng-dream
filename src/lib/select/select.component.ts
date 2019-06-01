import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'nd-select',
  exportAs: 'ndSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NdSelectComponent implements OnInit {

  private readonly el: HTMLElement;
  @ViewChild('overlayMenuList') overlayMenuList: TemplateRef<any>;
  @ViewChild('originFab') originFab: HTMLElement;
  private overlayRef: OverlayRef;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.originFab);
    this.overlayRef = this.overlay.create({
      positionStrategy: strategy
    });
  }

  displayMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(new TemplatePortal(this.overlayMenuList, this.viewContainerRef));
    }
  }
}
