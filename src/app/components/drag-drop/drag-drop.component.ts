import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  public option = [0,1,2,3,4,5,6,7,8];
  constructor() { }

  ngOnInit() {
  }

  onDrag(event: Event) {
    console.log('drag', event)
  }

  onDrop(event: Event) {
    console.log('drop', event)
  }

}
