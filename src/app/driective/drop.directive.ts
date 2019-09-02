import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {

  @Output() hwDragOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hwDrop: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() hwDragEnter: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() hwDragLeave: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    this.hwDragOver.emit(event);
    this.hwDrop.emit(event);
    event.dataTransfer.clearData();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();

    this.hwDragOver.emit(event);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    event.preventDefault();

    this.hwDragLeave.emit(event);
  }


  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    event.preventDefault();

    this.hwDragEnter.emit(event);
  }
}
