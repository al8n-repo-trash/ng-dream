import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {DragData, DropType} from '../types/drag-drop';
import {DragDropService} from './drag-drop.service';
import {take} from 'rxjs/operators';

@Directive({
  selector: '[nd-drop],[ndDropType],[ndDropTags]'
})
export class NdDropDirective {
  @Input('ndDropType') dragEnterClass: DropType = 'nd-drop-default';
  @Input('ndDropTags') dropTags: string[] = [];
  @Output() ndDropped = new EventEmitter<DragData>();
  private data$;

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.addClass(this.elementRef.nativeElement, this.dragEnterClass);
        }
      })
    }
  }
  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.setProperty(event, 'dataTransfer.effectAllowed', 'all');
          this.renderer.setProperty(event, 'dataTransfer.dropEffect', 'move');
        } else {
          this.renderer.setProperty(event, 'dataTransfer.effectAllowed', 'none');
          this.renderer.setProperty(event, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.removeClass(this.elementRef.nativeElement, this.dragEnterClass);
        }
      });
    }
  }
  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.elementRef.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.removeClass(this.elementRef.nativeElement, this.dragEnterClass);
          this.ndDropped.emit(dragData);
          this.ddService.clearDragData();
        }
      });
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ddService: DragDropService
  ) {
    this.data$ = this.ddService.getDragData().pipe(take(1));
  }

}
