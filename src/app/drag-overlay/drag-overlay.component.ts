import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent implements OnInit {
  private positionStrategy: GlobalPositionStrategy;
  private overlayRef: OverlayRef;
  private startX :number;
  private startY :number;

  @ViewChild(CdkPortal) templatePortal: CdkPortal;

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

  ngOnInit() {
    this.positionStrategy =
      this.overlay.position().global().left('100px').top('100px');
    const config = new OverlayConfig({
      positionStrategy: this.positionStrategy
    });
    this.overlayRef = this.overlay.create(config);
    this.templatePortal.attach(this.overlayRef);
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
    let x = $event.pageX;
    let y = $event.pageY;
    console.log('x:', x);
    console.log('y:', y);
    this.positionStrategy.left(x + 'px');
    this.positionStrategy.top(y + 'px');
    this.overlayRef.updatePosition();
  }

  drop($event) {
    console.log('drop:', $event);
  }

  click($event) {
    console.log('click:', $event);
  }
}
