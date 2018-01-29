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
  private _layerX: number;
  private _layerY: number;
  @ViewChild('dragImage') _dragImage: ElementRef;

  get dragstartX(): number {
    return this._layerX;
  }
  get dragstartY(): number {
    return this._layerY;
  }
  get dragImage(): Element {
    return this._dragImage.nativeElement;
  }
  // for Test
  click(event) {
    console.log('click', event);
  }
  // for set drag position
  mousedown(event) {
    console.log('mousedown', event);
    this._layerX = event['layerX'];
    this._layerY = event['layerY'];
  }
}
