import { Component, OnInit, OnDestroy, ElementRef, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, GlobalPositionStrategy, OverlayContainer } from '@angular/cdk/overlay';
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
  private positionStrategy: GlobalPositionStrategy;
  private overlayRef: OverlayRef;
  private startX :number;
  private startY :number;
  private offsetX = 100; // Initial position
  private offsetY = 100; // Initial position
  private dragSubscripton: Subscription;

  constructor(private overlay: Overlay, private overlayContainer: OverlayContainer) { }

  ngOnInit() {
    // Drop target area
    const targetElementRef = new ElementRef(document.body);

    // Initical position and layout
    this.positionStrategy = this.overlay.position().global();
    this.positionStrategy.left(this.offsetX + 'px');
    this.positionStrategy.top(this.offsetY + 'px');
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
    const dragEnd$ = Observable.fromEvent(overlayPane, 'dragend');
    const dragoverEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    const dropEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    this.dragSubscripton = dragstartEvents$.subscribe((event:DragEvent) => {
      console.log('dragstart:', event);
      event.dataTransfer.effectAllowed = "move"; // icon
      event.dataTransfer.setData('text/plain', 'dragging'); // for Firefox
      const instance: DragOverlayComponent = componentRef.instance;
      event.dataTransfer.setDragImage(overlayPane, instance.layerX, instance.layerY);

      this.startX = event.pageX;
      this.startY = event.pageY;

      const dragoverSubscription = dragoverEvents$.subscribe((event:DragEvent) => {
        event.preventDefault();
      });

      const dropSubscription = dropEvents$.take(1).subscribe((event:DragEvent) => {

        console.log('drop:', event); // for debug
        console.log('toElement', event.toElement); // drop先の取得 (?)

        this.offsetX = Math.min(window.innerWidth - overlayPane.clientWidth,
          Math.max(0, this.offsetX + event.pageX - this.startX));
        this.offsetY = Math.min(window.innerHeight - overlayPane.clientHeight,
          Math.max(0, this.offsetY + event.pageY - this.startY));
        
          this.positionStrategy.left(this.offsetX + 'px');
          this.positionStrategy.top(this.offsetY + 'px');
        this.overlayRef.updatePosition();
        dragoverSubscription.unsubscribe();
        event.preventDefault();
      });

      const dragendSubscription = dragEnd$.subscribe((event:any) => {
        console.log('dragend', event);
        dropSubscription.unsubscribe();
        dragendSubscription.unsubscribe();
        dragoverSubscription.unsubscribe();
      })
    });
  }
  ngOnDestroy() {
    this.dragSubscripton.unsubscribe();
  }
}
