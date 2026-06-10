import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { IMAGES } from '../constants';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  private readonly el = inject(ElementRef<HTMLImageElement>);
  private readonly IMAGES = IMAGES;
  readonly appImgFallback = input<string>(this.IMAGES.missing_no);

  @HostListener('error')
  onError(): void {
    const fallback = this.appImgFallback();
    if (this.el.nativeElement.src !== fallback) {
      this.el.nativeElement.src = fallback;
    }
  }
}
