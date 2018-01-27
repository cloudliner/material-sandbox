import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent {
  private _layerX: number;
  private _layerY: number;

  get layerX(): number {
    return this._layerX;
  }
  get layerY(): number {
    return this._layerY;
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
