import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Input() appDrag = '';
  @Output() hwDragStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() hwDragEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() hwDrag: EventEmitter<any> = new EventEmitter<any>();

  protected el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    // event.preventDefault();
    if (this.appDrag) {
      event.dataTransfer.setData('text/plain', this.appDrag);
    }

    this.hwDragStart.emit(event);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    event.preventDefault();
    event.dataTransfer.clearData();
  }

  @HostListener('drag', ['$event'])
  onDrag(event) {
    event.preventDefault();
    this.hwDrag.emit(event);
  }

}
