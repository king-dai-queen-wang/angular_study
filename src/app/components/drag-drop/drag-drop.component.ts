import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {DragDirective} from "../../driective/drag.directive";
import {isNullOrUndefined} from "util";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @ViewChildren(DragDirective) dragItems: QueryList<DragDirective>;
  public option$: BehaviorSubject<number[]> = new BehaviorSubject([0,1,2,3,4,5,6,7,8]);
  private dragSource: any;
  private dragTarget: any;
  private isDragging = false;

  lastTransformedBlock = null;
  constructor(private render2:Renderer2, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  isMyself(target: any) {
    return this.dragSource.toString() === target.toString();
  }

  addDragClass(event: Event) {
    (event.currentTarget as HTMLElement).classList.add('dragging');
  }

  removeDragClass(event: Event){
    (event.currentTarget as HTMLElement).classList.remove('dragging');
  }

  onDragStart(event: Event) {
    this.dragSource = event.dataTransfer.getData('text/plain');
    console.log('dragStart', event);
    this.addDragClass(event);
  }

  onDrag(event: Event) {
    // console.log('drag', event)
  }

  onDragEnd(event: Event) {
    // console.log('dragEnd', event);
    this.removeDragClass(event);
    this.isDragging = false;
  }

  onDragEnter(event: Event, target: any) {
    if (this.isMyself(target) || this.lastTransformedBlock === target) {
      return;
    }

    // reset last
    if(!isNullOrUndefined(this.lastTransformedBlock)) this.resetDragTargetPosition(this.lastTransformedBlock);

    this.lastTransformedBlock = target;

    this.addDragClass(event);
    console.log('onDragEnter', event, target);
    this.dragTarget = target;
    this.changePosition();
  }

  onDragOver(event: Event) {
    // console.log('onDragOver', event)
  }

  onDragLeave(event: Event, target: any) {
    if (this.isMyself(target)) {
      return;
    }
    this.removeDragClass(event);
    // this.dragTarget = target;
    // console.log('onDragLeave', event);
    // this.resetPosition();
  }

  onDrop(event: Event, target) {
    this.removeDragClass(event);
    console.log('drop', event);
    const fromData = event.dataTransfer.getData('text/plain');
    this.ajax(fromData, this.dragTarget);
    this.resetPosition();
  }

  ajax(fromData: any, targetData: any): void {
    console.log(fromData, targetData);
    if (fromData === targetData) {
      return;
    }
    const option = this.option$.getValue();
    option.splice(targetData,1,...option.splice(fromData, 1 , option[targetData]));
    console.log(option);
    this.option$.next(option);
    this.cdr.markForCheck();
    this.dragTarget = null;
    this.dragSource = null;
  }

  changePosition() {
    // console.log('changePosition');
    const sourceEl: ElementRef = this.dragItems.find(i => i.appDragData.toString() === this.dragSource.toString()).el;
    const sourcePosition = [(sourceEl.nativeElement as HTMLElement).offsetLeft, (sourceEl.nativeElement as HTMLElement).offsetTop];
    const targetEl: ElementRef = this.dragItems.find(i => i.appDragData.toString() === this.dragTarget.toString()).el;
    const targetPosition = [(targetEl.nativeElement as HTMLElement).offsetLeft, (targetEl.nativeElement as HTMLElement).offsetTop];
    let toSourceValue = `translate(${ Math.round(sourcePosition[0] - targetPosition[0]) }px, ${ Math.round(sourcePosition[1] - targetPosition[1]) }px)`;
    let toTargetValue = `translate(${ Math.round(targetPosition[0] - sourcePosition[0]) }px, ${ Math.round(targetPosition[1] - sourcePosition[1]) }px)`;
    this.render2.setStyle(sourceEl.nativeElement,'transform', toTargetValue);
    this.render2.setStyle(sourceEl.nativeElement,'z-index', 999);
    this.render2.setStyle(targetEl.nativeElement,'transform', toSourceValue);
    // console.log( sourcePosition, targetPosition);
  }

  resetPosition() {
    console.log('reset');
    const sourceEl: ElementRef = this.dragItems.forEach(item => {
      this.render2.setStyle(item.el.nativeElement,'transform', `translate(0)`);
    });

  }

  resetDragTargetPosition(target) {
    console.log('resetDragTargetPosition', target);
    const targetEl: ElementRef = this.dragItems.find(i => i.appDragData.toString() === target.toString()).el;
    const targetPosition = [0, 0];

    let toTargetValue = `translate(0)`;

    this.render2.setStyle(targetEl.nativeElement,'transform', toTargetValue);
    this.render2.removeClass(targetEl.nativeElement,'dragging');
  }

}
