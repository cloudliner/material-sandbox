import { Component, ViewChild, ElementRef } from '@angular/core';

export interface DraggableCompoent {
  readonly dragstartX: number;
  readonly dragstartY: number;
  readonly dragImage: Element;
}

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent implements DraggableCompoent {
  private _offsetX: number;
  private _offsetY: number;
  @ViewChild('dragImage') _dragImage: ElementRef;

  get dragstartX(): number {
    return this._offsetX;
  }
  get dragstartY(): number {
    return this._offsetY;
  }
  get dragImage(): Element {
    return this._dragImage.nativeElement;
  }
  // for Test
  click(event) {
    console.log('click', event);
  }
  // for set drag position
  mousedown(event:MouseEvent) {
    console.log('mousedown', event);
    this._offsetX = event.offsetX;
    this._offsetY = event.offsetY;
  }
}
