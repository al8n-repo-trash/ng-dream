import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnDestroy,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'nd-banner-fade',
  exportAs: 'ndBannerFade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'nd-banner-fade'}
})
export class NdBannerFadeComponent implements AfterViewInit, OnDestroy {


  @Input() imageList: string[];
  @Input() duration: number = 5000;
  @Input() navType: string;
  @ViewChildren('ndNavList') ndNavList: QueryList<HTMLElement>;
  @ViewChildren('ndImages') images: QueryList<HTMLElement>;

  private destroyed: boolean = false;
  public currentIndex: number = 0;

  private begin = null;
  private imagesQueryList: ElementRef[] = [];
  private ndNavListQueryList: ElementRef[] = [];

  private static getQueryListResult(queryList: QueryList<HTMLElement>): ElementRef[] {

    return queryList['_results'];
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }


  ngAfterViewInit() {


    this.imagesQueryList = NdBannerFadeComponent.getQueryListResult(this.images);
    this.ndNavListQueryList = NdBannerFadeComponent.getQueryListResult(this.ndNavList);

    this.renderer.addClass(this.imagesQueryList[0].nativeElement, 'nd-banner-img-container-active');
    if (this.navType === 'line') {
      this.renderer.setStyle(this.ndNavListQueryList[0].nativeElement, 'animation', 'progressBar ' + this.duration  + 'ms');
    } else if (this.navType === 'dots') {
      this.renderer.addClass(this.ndNavListQueryList[0].nativeElement, 'dots-active');
    }

    this.begin = setInterval(() => {
      this.autoPlay();
    }, this.duration);
  }



  private autoPlay() {
    this.deactiveImage();
    if (this.currentIndex < this.imageList.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.activeImage();
  }

  public goPrev() {
    this.deactiveImage();
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.imageList.length - 1;
    }
    this.activeImage();
  }

  public goNext()  {
    this.deactiveImage();
    if (this.currentIndex + 1 < this.imageList.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.activeImage();
  }

  private deactiveImage() {
    clearInterval(this.begin);
    const lastNav = this.ndNavListQueryList[this.currentIndex].nativeElement;
    const lastTarget = this.imagesQueryList[this.currentIndex].nativeElement;
    this.renderer.removeClass(lastTarget, 'nd-banner-img-container-active');

    if (this.navType === 'line') {
      this.renderer.removeStyle(lastNav, 'animation');
    } else if (this.navType === 'dots') {
      this.renderer.removeClass(lastNav, 'dots-active');
    }
  }

  private activeImage() {
    const currentTarget = this.imagesQueryList[this.currentIndex].nativeElement;
    const currentNav = this.ndNavListQueryList[this.currentIndex].nativeElement;
    this.renderer.addClass(currentTarget, 'nd-banner-img-container-active');
    if (this.navType === 'line') {
      this.renderer.setStyle(currentNav, 'animation', 'progressBar ' + this.duration  + 'ms linear');
    } else if (this.navType === 'dots') {
      this.renderer.addClass(currentNav, 'dots-active');
    }

    this.begin = setInterval(() => {
      this.autoPlay();
    }, this.duration);
  }

  public skipToImage(idx: number) {
    if (idx !== this.currentIndex) {
      this.deactiveImage();
      this.currentIndex = idx;
      this.activeImage();
    }
  }

  ngOnDestroy() {
    this.destroyed = true;
    clearInterval(this.begin);
  }


}
