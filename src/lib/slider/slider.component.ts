import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef, HostListener,
  Input,
  OnChanges, OnDestroy, QueryList,
  Renderer2, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';

import {NdSliderService} from '../core/service/slider.service';

@Directive({
  selector: '[nd-slider-button],[ndStyle]',
  host: {class: 'nd-slider-button'}
})

export class NdSliderButtonDirective implements OnChanges, AfterViewInit {
  @Input() public ndStyle: object;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }


}

@Component({
  selector: 'nd-slider,[ndWidth],[ndHeight],[ndSliderContent],[ndTitleStyle],[ndSubtitleStyle],[ndDescribeStyle],[ndImageStyle]',
  exportAs: 'ndSlider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  host: {
    class: 'nd-slider-container'
  },
  providers: [NdSliderService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class NdSliderComponent implements OnChanges, OnDestroy, AfterViewInit {
  public imgs = [
    'https://nav.yourskills.cn/back.jpg',
    'https://nav.yourskills.cn/back2.jpg',
    'https://nav.yourskills.cn/back3.jpg',
    'https://nav.yourskills.cn/back.jpg',
    'https://nav.yourskills.cn/back2.jpg',
    'https://nav.yourskills.cn/back3.jpg',
    'https://nav.yourskills.cn/back.jpg',
    'https://nav.yourskills.cn/back2.jpg',
    'https://nav.yourskills.cn/back3.jpg',
  ];

  @Input() public ndWidth: string;
  @Input() public ndHeight: string;
  @Input() public ndSliderContent: string[] | {
    url: string,
    title?: string,
    subtitle?: string,
    describe?: string,
  }[] = [];
  @Input() public ndTitleStyle: object;
  @Input() public ndSubtitleStyle: object;
  @Input() public ndDescribeStyle: object;
  @Input() public ndImageStyle: object;
  @Input() public ndSmallImageStyle: object;
  @Input() public ndSmallImagePreviousMargin: string;
  @Input() public ndSmallImageNextMargin: string;
  @Input() public ndGalleryDirection: string;
  @Input() public ndGallery: boolean;
  @Input() public ndGalleryPosition: string;

  @ViewChild('ndSliderSection') private sectionEl: ElementRef<HTMLElement>;
  @ViewChild('ndSliderContentContainer') private contentEl: ElementRef<HTMLElement>;
  @ViewChild('ndSmallGallery') private smallGalleryEl: ElementRef<HTMLElement>;
  @ViewChild('ndSmallGalleryUl') private smallGalleryUlEl: ElementRef<HTMLElement>;
  @ViewChildren('ndSmallGalleryLi') private smallGalleryLiEl: QueryList<ElementRef<HTMLElement>>;

  public isDetail: boolean = false;
  private destroyed: boolean = false;
  public currentIndex: number = 0;
  public lastDirectionIsRight: boolean = false;
  private timerScroll: any;
  public containerWidth: number = 0;
  private windowResizing: boolean = true;
  public get currentImage() { return this.ndSliderContent[this.currentIndex]; }
  public get currentIsFisrt() { return this.currentIndex === 0; }
  public get currentIsLast() { return this.currentIndex === (this.ndSliderContent.length - 1); }


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private sliderSevice: NdSliderService
  ) { }

  ngOnChanges() {
    this.init();

  }

  ngAfterViewInit() {
    // this.defineContainerWidth();
    this.containerWidth = 400;
    // console.log(this.smallGalleryLiEl);
    // console.log(this.containerWidth);
  }

  private init = () => {
    if (this.ndHeight) {
      this.setSize(this.ndHeight);
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.ndHeight);
    }

    if (this.ndWidth) {
      this.setSize(this.ndWidth);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.ndWidth);
      this.containerWidth = Number(this.ndWidth.replace(/^[0-9]$/, ''));
    } else {
      if (this.sectionEl && this.sectionEl.nativeElement) {
        this.containerWidth = this.sectionEl.nativeElement.clientWidth;
      }
    }

    this.dealWithItem();
  };

  private defineContainerWidth = () => {
    if (this.destroyed) {
      return;
    }

    if (!this.windowResizing) {

    }

    setTimeout(this.defineContainerWidth.bind(this), 100);
  };

  private setSize = (param: string) => {
    if (typeof param !== 'string') {
      param = 'inherit';

    } else if (!(new RegExp(/^[a-z]|[%]$/).test(param))) {
      param = param + 'px';
    }
  };


  private dealWithItem = () => {
    if (this.ndSliderContent && this.ndSliderContent.length) {
      if (typeof this.ndSliderContent[0] !== 'string') {
        this.isDetail = true;

        this.dealTitle();

        this.checkSubTitle();

        this.checkDescribe();


      }
    }
  };

  private getImgs = (): string[] => {
    // const tmp = [];
    // for (const k of this.ndSliderContent) {
    //   tmp.push(k.url);
    // }
    // return tmp;
    return;
  };

  private dealTitle = () => {
    // if (typeof this.ndSliderContent[0].title !== 'string' && JSON.stringify(this.ndSliderContent[0].title) !== '{}') {
    //   const tmp = [];
    //   for (const k of this.ndSliderContent) {
    //     tmp.push(k.title)
    //   }
    // } else {
    //
    // }
  };

  private checkSubTitle = () => {
    // if (typeof this.ndSliderContent[0].subtitle !== 'string' && JSON.stringify(this.ndSliderContent[0].subtitle) !== '{}') {
    //   console.log('subtitle');
    // } else {
    //
    // }
  };

  private checkDescribe = () => {
    // if (typeof this.ndSliderContent[0].describe !== 'string' && JSON.stringify(this.ndSliderContent[0].describe) !== '{}') {
    //   console.log('describe');
    // } else {
    //
    // }
  };


  public goPrev = (salt: number = 0) => {
    if (this.currentIndex > 0) {
      if (salt) {
        if ((this.currentIndex - salt) >= 0) {
          this.currentIndex -= salt + 1;
        } else {
          this.currentIndex = 0;
        }
      } else {
        this.currentIndex--;
      }

      this.lastDirectionIsRight = false;

      const tartget = this.smallGalleryEl.nativeElement.children[0].children[this.currentIndex] as HTMLElement;
      if (this.smallGalleryEl && this.smallGalleryEl.nativeElement) {
        this.scrollingToElement(tartget, this.lastDirectionIsRight);
      }
    }
  };


  public goNext = (salt: number = 0) => {
    if ((this.currentIndex + 1) < this.ndSliderContent.length) {
      if (salt) {
        if ((this.currentIndex - salt) >= 0) {
          this.currentIndex = salt + 1;
        } else {
          this.currentIndex = this.ndSliderContent.length;
        }
      } else {
        this.currentIndex++;
      }

      this.lastDirectionIsRight = true;

      const target = this.smallGalleryEl.nativeElement.children[0].children[this.currentIndex] as HTMLElement;
      if (this.smallGalleryEl && this.smallGalleryEl.nativeElement) {
        this.scrollingToElement(target, this.lastDirectionIsRight);
      }
    }
  };

  private getSmallImagePadding = (): number => {
    if (this.ndSmallImageStyle.hasOwnProperty('margin')) {

    }
    return
  };

  private scrollingToElement(el: HTMLElement, directionIsRight: boolean) {
    const scrollElement = this.smallGalleryEl.nativeElement;
    if (scrollElement && scrollElement.scrollWidth > 0) {
      const blockWidth = el.clientWidth + 14;
      const scrollLeft = el.clientWidth - 14;
      const scrollRight = el.offsetLeft - 14;
      const currentScrollLeft = scrollElement.scrollLeft;
      const currentScrollRight = scrollElement.scrollLeft + scrollElement.clientWidth;
      let scroll = .1;

      if (directionIsRight && (currentScrollRight - scrollRight) < Math.floor(blockWidth / 2)) {
        scroll = currentScrollLeft + blockWidth + 100;
      } else if (!directionIsRight && (scrollLeft - currentScrollLeft) < Math.floor(blockWidth / 2)) {
        scroll = currentScrollLeft - blockWidth;
      }

      if (scroll !== .1) {
        if (this.timerScroll) {
          clearInterval(this.timerScroll);
        }
        this.timerScroll = this.sliderSevice.smoothScroll(scrollElement, scroll, 400, 'left');
      }
    }
  }

  public selectImage = (imageIndex: number, event) => {
    if (imageIndex !== this.currentIndex) {
      this.lastDirectionIsRight = imageIndex > this.currentIndex;
      this.currentIndex = imageIndex;

      if (event.target && this.smallGalleryEl && this.smallGalleryEl.nativeElement) {
        this.scrollingToElement(event.target as HTMLElement, this.lastDirectionIsRight);
      }
    }
  };


  ngOnDestroy() {
    this.destroyed = true;
  }
}
