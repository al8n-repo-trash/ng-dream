import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragType} from '../types/drag-drop';
import {DragDropService} from './drag-drop.service';

@Directive({
  selector: '[nd-drag],[ndDragType],[ndDragTag],[ndDragData]',
})
export class NdDragDirective {
  private isDraggable: boolean = true;

  @Input('nd-drag') set Draggable(val: boolean) {

    this.isDraggable = val;

    this.renderer.setAttribute(this.elementRef.nativeElement, 'draggable', `${val}`);
  }

  get Draggable() {
    return this.isDraggable;
  }

  @Input() ndDragTag: string = 'task-item';
  @Input() ndDragData: any = 'item';
  @Input('ndDragType') draggedClass: DragType = 'nd-drag-dashed';


  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event) {
    if (this.elementRef.nativeElement === event.target) {
      this.renderer.addClass(this.elementRef.nativeElement, this.draggedClass);
      this.ddService.setDragData({tag: this.ndDragTag, data: this.ndDragData});
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: Event) {
    if (this.elementRef.nativeElement === event.target) {
      this.renderer.removeClass(this.elementRef.nativeElement, this.draggedClass)
    }
  }
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ddService: DragDropService
  ) { }

}
