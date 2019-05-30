import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit, Output,
  Renderer2, SimpleChange, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'nd-tab-item',
  exportAs: 'ndTabItem',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NdTabItemComponent implements OnChanges, OnInit, OnDestroy {

  /** Emits whenever the internal state of the tab changes. */
  readonly _stateChanges = new Subject<void>();

  /**
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  position: number | null = null;

  /**
   * The initial relatively index origin of the tab if it was created and selected after there
   * was already a selected tab. Provides context of what position the tab should originate from.
   */
  origin: number | null = null;

  /**
   * Whether the tab is currently active.
   */
  isActive = false;

  private readonly el: HTMLElement;
  @ViewChild(TemplateRef) content: TemplateRef<void>;
  @Input('ndLabel') textLabel: string = ''; // tslint:disable-line:no-input-rename
  @Input() ndDisabled: boolean = false; // tslint:disable-line:no-input-rename

  @Output() readonly ndClick = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('ndLabel') || changes.hasOwnProperty('ndDisabled')) {
      this._stateChanges.next();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
