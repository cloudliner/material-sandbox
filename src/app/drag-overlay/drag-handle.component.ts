import { Component, OnInit, OnDestroy, ElementRef, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/take';

import { DragOverlayComponent } from './drag-overlay.component';

// Control for Overlay and Drag
@Component({
  selector: 'app-drag-handle',
  template: ''
})
export class DragHandleComponent implements OnInit, OnDestroy {
  private positionStrategy: ConnectedPositionStrategy;
  private overlayRef: OverlayRef;
  private startX :number;
  private startY :number;
  private offsetX = 100; // Initial position
  private offsetY = 100; // Initial position
  private dragSub: Subscription;

  constructor(private overlay: Overlay) { }

  ngOnInit() {
    // Drop target area
    const targetElementRef = new ElementRef(document.body);

    // Initical position and layout
    this.positionStrategy =
      this.overlay.position().connectedTo(targetElementRef, {
        originX: 'start',
        originY: 'top'
      }, {
        overlayX: 'start',
        overlayY: 'top'
      });
    this.positionStrategy.withOffsetX(this.offsetX);
    this.positionStrategy.withOffsetY(this.offsetY);
    const config = new OverlayConfig({
      positionStrategy: this.positionStrategy,
      panelClass: 'overlayPane' // for style?
    });
    this.overlayRef = this.overlay.create(config);
    const portal = new ComponentPortal(DragOverlayComponent);
    const componentRef: ComponentRef<DragOverlayComponent> = this.overlayRef.attach(portal);

    // Drag object
    const overlayPane = this.overlayRef.overlayElement;

    const dragstartEvents$ = Observable.fromEvent(overlayPane, 'dragstart');
    const dragoverEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    const dropEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    // TODO: event を any 以外にできないのか？
    this.dragSub = dragstartEvents$.subscribe((event:any) => {
      console.log('dragstart:', event);
      event.dataTransfer.effectAllowed = "move"; // icon
      event.dataTransfer.setData('text/plain', 'dragging'); // for Firefox
      const instance: DragOverlayComponent = componentRef.instance;
      event.dataTransfer.setDragImage(overlayPane, instance.layerX, instance.layerY);

      this.startX = event.pageX;
      this.startY = event.pageY;

      const dragoverSub = dragoverEvents$.subscribe((event:any) => {
        event.preventDefault();
      });

      const dropSub = dropEvents$.take(1).subscribe((event:any) => {
        console.log('drop:', event);
        this.offsetX = this.offsetX + event.pageX - this.startX;
        this.offsetY = this.offsetY + event.pageY - this.startY;
        this.positionStrategy.withOffsetX(this.offsetX);
        this.positionStrategy.withOffsetY(this.offsetY);
        this.overlayRef.updatePosition();
        dragoverSub.unsubscribe();
        event.preventDefault();
      });
    });
  }
  ngOnDestroy() {
    this.dragSub.unsubscribe();
  }
}
