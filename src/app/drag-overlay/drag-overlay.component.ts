import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent implements OnInit {
  private positionStrategy: ConnectedPositionStrategy;
  private overlayRef: OverlayRef;
  private startX :number;
  private startY :number;
  private offsetX = 100;
  private offsetY = 100;

  @ViewChild(CdkPortal) templatePortal: CdkPortal;

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

  ngOnInit() {
    const targetElementRef = 		
      new ElementRef(document.querySelectorAll('.targetElement')[0]);
    console.log(targetElementRef);
    this.positionStrategy =
      this.overlay.position().connectedTo(targetElementRef, {
        originX: 'start',
        originY: 'top'
      }, {
        overlayX: 'start',
        overlayY: 'top'
      }).withOffsetX(this.offsetX).withOffsetY(this.offsetY);
    const config = new OverlayConfig({
      positionStrategy: this.positionStrategy
    });
    this.overlayRef = this.overlay.create(config);
    this.templatePortal.attach(this.overlayRef);
  }

  dragstart($event) {
    console.log('dragstart:', $event);
    this.startX = $event.layerX;
    this.startY = $event.layerY;
  }

  dragenter($event) {
    console.log('dragenter:', $event);
  }

  dragover($event) {
    console.log('dragover:', $event);
  }

  dragleave($event) {
    console.log('dragleave:', $event);
  }

  dragend($event) {
    console.log('dragend:', $event);
    this.offsetX = this.offsetX + $event.layerX - this.startX;
    this.offsetY = this.offsetY + $event.layerY - this.startY;
    console.log('x:', this.offsetX);
    console.log('y:', this.offsetY);
    this.positionStrategy.withOffsetX(this.offsetX);
    this.positionStrategy.withOffsetY(this.offsetY);
    this.overlayRef.updatePosition();
  }

  drop($event) {
    console.log('drop:', $event);
  }

  click($event) {
    console.log('click:', $event);
  }
}
