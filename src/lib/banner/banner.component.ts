import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit, QueryList, Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'nd-banner, [ndBannerType], [ndWidth], [ndHeight], [ndNav], [ndNavType], [ndImages]',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  exportAs: 'ndBanner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'nd-banner'
  }
})
export class NdBannerComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() ndWidth: string;
  @Input() ndHeight: string;
  @Input() ndBannerType: string;
  @Input() ndAnimation: string;
  @Input() ndNav: boolean = true;
  @Input() ndNavType: string = 'default';
  @Input() ndImages: string[];
  @Input() duration: number = 3000;
  @Input() autoSize: boolean = true;
  @ViewChildren('ndBanners') private ndBannersEl: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('ndBannerContainer', {static: false}) private ndBannerContainerEl: ElementRef<HTMLElement>;

  public currentIndex: number = 0;
  public width: number = 0;
  public imageList: string[] = [];
  public initialed: boolean = false;
  private destroyed: boolean = false;
  public resize: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {

  }

  ngOnChanges() {
    this.initBanner();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

      // this.play();

      // this.dealType();

  }

  ngAfterViewChecked() {
  }


  onResize(event) {
    if (!this.destroyed && !this.resize) {
      this.resize = true;
      setTimeout(() => {
        this.width = this.ndBannerContainerEl.nativeElement.clientWidth;
        this.resize = false;
      });
    }
  }

  private dealType = () => {
    if (!this.ndBannerType) {
      this.imageList = this.ndImages;
      return
    }

    if (this.ndBannerType === 'scroll') {
      this.imageList = this.ndImages;
      this.imageList = [this.ndImages[this.ndImages.length - 1]].concat(this.imageList);
      this.imageList = this.imageList.concat(this.ndImages[0]);
    }
  };

  private defineContainerWidth = () => {
    if (this.destroyed) {
      return;
    }

    if (!this.resize) {
      let width = 0;
      if (this.ndBannerContainerEl && this.ndBannerContainerEl.nativeElement) {
        width = this.ndBannerContainerEl.nativeElement.clientWidth;
      }

      if (width !== this.width) {
        this.width = width;
      }
    }

    setTimeout(this.defineContainerWidth.bind(this), 100);
  };

  private initBanner = () => {
    this.initialed = true;
    this.dealType();
    this.defineContainerWidth();
  };

  private autoPlay = () => {
    if (this.resize) {
      return
    }
    if (this.currentIndex < this.imageList.length - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0;
    }
    const offset = (-this.width * this.currentIndex) + 'px';
    if (this.ndBannerContainerEl && this.ndBannerContainerEl.nativeElement) {
      this.renderer.setStyle(this.ndBannerContainerEl.nativeElement, 'left', offset);
    }

  };

  private play = () => {
    setInterval(() => {
      this.autoPlay()
    }, this.duration)
  };

  ngOnDestroy() {
    this.destroyed = true;
  }
}
