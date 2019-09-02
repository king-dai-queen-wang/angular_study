import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  public option = [0,1,2,3,4,5,6,7,8];
  private fromXY = [];
  private toXY = [];
  private transformXY = [];
  constructor() { }

  ngOnInit() {
  }

  addDragClass(event: Event) {
    (event.currentTarget as HTMLElement).classList.add('dragging');
  }

  removeDragClass(event: Event){
    (event.currentTarget as HTMLElement).classList.remove('dragging');
  }

  onDragStart(event: Event) {
    console.log('dragStart', event);
    this.addDragClass(event);
    this.fromXY = [(event.target as HTMLElement).offsetLeft, (event.target as HTMLElement).offsetTop ];
  }

  onDrag(event: Event) {
    // console.log('drag', event)
  }

  onDragEnd(event: Event) {
    console.log('dragEnd', event);
    this.removeDragClass(event);
  }

  onDragEnter(event: Event) {

    this.addDragClass(event);
    console.log('onDragEnter', event);
    // this.toXY = x_y;
  }

  onDragOver(event: Event) {
    // console.log('onDragOver', event)
  }

  onDragLeave(event: Event) {
    const x_y = [(event.target as HTMLElement).offsetLeft, (event.target as HTMLElement).offsetTop ];
    if (this.fromXY[0] === x_y[0] && this.fromXY[1] === x_y[1]) {
      return;
    }
    this.removeDragClass(event);
    console.log('onDragLeave', event)
  }

  onDrop(event: Event, targetData: any) {
    this.removeDragClass(event);
    console.log('drop', event);
    const x_y = [(event.target as HTMLElement).offsetLeft, (event.target as HTMLElement).offsetTop ];
    if (this.fromXY[0] === x_y[0] && this.fromXY[1] === x_y[1]) {
      return;
    }
    const fromData = event.dataTransfer.getData('text/plain');
    this.toXY = x_y;
    this.changePosition(fromData, targetData);
  }

  changePosition(fromData: any, targetData: any) {
    console.log(fromData, targetData)
  }

}
