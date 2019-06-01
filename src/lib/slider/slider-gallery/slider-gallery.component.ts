import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NdSliderService} from '../../core/service/slider.service';


@Component({
  selector: 'nd-slider-gallery',
  exportAs: 'ndSliderGallery',
  templateUrl: './slider-gallery.component.html',
  styleUrls: ['./slider-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [NdSliderService]
})
export class NdSliderGalleryComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() public ndImageList: string[] | { url: string }[];
  @Input() public ndStyle: object;
  @ViewChild('ndGallery', {static: false}) gallery: ElementRef<HTMLElement>;


  private timerScroll: any;
  public currentIndex: number = 0;
  private lastDirectionIsRight: boolean = false;
  public imgList: string[] = [];

  constructor(
    private elementRef: ElementRef,
    private sliderService: NdSliderService,
  ) { }

  ngOnChanges() {
    this.dealImages();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  private dealImages() {
    // if (typeof this.ndImageList[0] !== 'string') {
    //   for (const k in this.ndImageList) {
    //     if (k.hasOwnProperty('url')) {
    //       this.imgList.push(k.url);
    //     }
    //   }
    // } else {
    //   for (const k of this.ndImageList) {
    //     this.imgList.push(k);
    //   }
    // }
  }

  private scrollingToElement(el: HTMLElement, directionIsRight: boolean) {
    const scrollElement = this.gallery.nativeElement;
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
        this.timerScroll = this.sliderService.smoothScroll(scrollElement, scroll, 400, 'left');
      }
    }
  }

  public selectImage = (imageIndex: number, event) => {
    if (imageIndex !== this.currentIndex) {
      this.lastDirectionIsRight = imageIndex > this.currentIndex;
      this.currentIndex = imageIndex;

      if (event.target && this.gallery && this.gallery.nativeElement) {
        this.scrollingToElement(event.target as HTMLElement, this.lastDirectionIsRight);
      }
    }
  };
}
