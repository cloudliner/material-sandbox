import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, GlobalPositionStrategy, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/take';

import { DraggableCompoent, DragOverlayComponent } from './drag-overlay.component';

// Control for Overlay and Drag
@Component({
  selector: 'app-drag-handle',
  template: ''
})
export class DragHandleComponent implements OnInit, AfterViewInit, OnDestroy {
  private positionStrategy: GlobalPositionStrategy;
  private overlayRef: OverlayRef;
  private startX: number;
  private startY: number;
  private offsetX = 0;
  private offsetY = 0;
  private subscriptions: { [key: string]: Subscription } = {
    drag: null,
    drop: null,
    dragover: null,
    dragend: null,
    resize: null
  };

  constructor(private overlay: Overlay, private overlayContainer: OverlayContainer) { }

  ngOnInit() {
    this.positionStrategy = this.overlay.position().global();
    const config = new OverlayConfig({
      positionStrategy: this.positionStrategy,
      panelClass: 'overlayPane' // for style?
    });
    this.overlayRef = this.overlay.create(config);
    const portal = new ComponentPortal(DragOverlayComponent);
    const componentRef: ComponentRef<DraggableCompoent> = this.overlayRef.attach(portal);

    // Drag object
    const overlayPane = this.overlayRef.overlayElement;
    // Drop target area
    const targetElementRef = new ElementRef(document.body);

    const dragstart$ = Observable.fromEvent(overlayPane, 'dragstart');
    const dragend$ = Observable.fromEvent(overlayPane, 'dragend');
    const dragover$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    const drop$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    this.subscriptions.drag = dragstart$.subscribe((event: DragEvent) => {
      console.log('dragstart:', event);
      const instance: DraggableCompoent = componentRef.instance;
      this.setDragImage(event, instance);
      this.startX = event.pageX;
      this.startY = event.pageY;

      this.subscriptions.dragover = dragover$.subscribe((dragoverEvent: DragEvent) => {
        dragoverEvent.preventDefault();
      });

      this.subscriptions.drop = drop$.take(1).subscribe((dragEvent: DragEvent) => {
        console.log('drop:', dragEvent); // for debug
        console.log('toElement', dragEvent.toElement); // drop先の取得
        this.setPosition(
          this.offsetX + dragEvent.pageX - this.startX,
          this.offsetY + dragEvent.pageY - this.startY);
        this.subscriptions.dragover.unsubscribe();
        dragEvent.preventDefault();
      });

      this.subscriptions.dragend = dragend$.subscribe((dragendEvent: DragEvent) => {
        console.log('dragend', dragendEvent); // for debug
        this.subscriptions.drop.unsubscribe();
        this.subscriptions.dragend.unsubscribe();
        this.subscriptions.dragover.unsubscribe();
      });
    });

    // for window resize
    const resize$ = Observable.fromEvent(window, 'resize');
    this.subscriptions.resize = resize$.subscribe((resizeEvent: UIEvent) => {
      console.log('resize', resizeEvent);
      this.setPosition(this.offsetX, this.offsetY);
    });
  }

  ngAfterViewInit() {
    this.setPosition(
      (document.body.clientWidth - this.overlayRef.overlayElement.clientWidth) / 2,
      window.innerHeight - this.overlayRef.overlayElement.clientHeight);
  }

  ngOnDestroy() {
    for (let key in this.subscriptions) {
      let eventSubscription:Subscription = this.subscriptions[key];
      if (eventSubscription) {
        eventSubscription.unsubscribe();
      }
    }
  }

  private setDragImage(event: DragEvent, dragInstance: DraggableCompoent) {
    event.dataTransfer.effectAllowed = 'move'; // icon
    event.dataTransfer.setData('text/plain', 'dragging'); // for Firefox
    event.dataTransfer.setDragImage(dragInstance.dragImage, dragInstance.dragstartX, dragInstance.dragstartY);
  }

  private setPosition(x: number, y: number) {
    if (this.overlayRef && this.positionStrategy) {
      this.offsetX = Math.max(0, x);
      this.offsetY = Math.max(0, y);
      if (this.overlayRef.overlayElement) {
        this.offsetX = Math.min(this.offsetX,
          document.body.clientWidth - this.overlayRef.overlayElement.clientWidth);
        this.offsetY = Math.min(this.offsetY,
          window.innerHeight - this.overlayRef.overlayElement.clientHeight);
      }
      this.positionStrategy.left(this.offsetX + 'px');
      this.positionStrategy.top(this.offsetY + 'px');
      this.overlayRef.updatePosition();
    }
  }
}
