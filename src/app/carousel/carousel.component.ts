import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  AfterViewChecked,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent
  implements OnChanges, AfterViewInit, AfterViewChecked
{
  @Input() images: any[] = [];
  @Input() isLoading = false;
  @Input() imageLimit = this.images.length;
  @Input() customPrevButton: any;
  @Input() customNextButton: any;
  @Input() onImgClick: (image: any, index: number) => void = () => {};
  @Input() imgPerSlide = 1;

  currentIndex = 0;
  imgWidth = 0;
  imagesLoaded = false;

  @ViewChildren('carouselImage') imageElements!: QueryList<ElementRef>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && this.images.length > 0) {
      this.currentIndex = 0;
      this.imagesLoaded = false;
    }
  }

  ngAfterViewInit() {
    this.imageElements.changes.subscribe(() => {
      this.calculateImageWidth();
    });
  }

  ngAfterViewChecked() {
    if (!this.imagesLoaded && this.imageElements.length > 0) {
      this.calculateImageWidth();
    }
  }

  calculateImageWidth() {
    setTimeout(() => {
      if (this.imageElements.first) {
        const width = this.imageElements.first.nativeElement.offsetWidth;
        if (width > 0) {
          this.imgWidth = width;
          this.imagesLoaded = true;
        }
      }
    }, 0);
  }

  goToPrev() {
    this.currentIndex =
      this.currentIndex === 0 ? this.imageLimit - 1 : this.currentIndex - 1;
  }

  goToNext() {
    this.currentIndex =
      this.currentIndex === this.imageLimit - 1 ? 0 : this.currentIndex + 1;
  }

  onImageLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      setTimeout(() => {
        this.imgWidth = target.offsetWidth;
      }, 0);
    }
  }
}
