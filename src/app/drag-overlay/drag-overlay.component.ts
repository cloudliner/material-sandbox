import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef, Output, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/take';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-overlay',
  template: ''
})
export class OverlayComponent implements OnInit, OnDestroy {
  private positionStrategy: ConnectedPositionStrategy;
  private overlayRef: OverlayRef;
  private startX :number;
  private startY :number;
  private offsetX = 100;
  private offsetY = 100;
  private dragSub: Subscription;

  constructor(private overlay: Overlay) { }

  ngOnInit() {
    // Drop対象
    const targetElementRef = new ElementRef(document.body);

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
      panelClass: 'overlayPane' // スタイル？
    });
    this.overlayRef = this.overlay.create(config);
    let portal = new ComponentPortal(DragOverlayComponent);
    let componentRef: ComponentRef<DragOverlayComponent> = this.overlayRef.attach(portal);

    // Drag対象
    const overlayPane = this.overlayRef.overlayElement;

    let dragstartEvents$ = Observable.fromEvent(overlayPane, 'dragstart');
    let dragoverEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    let dropEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    // event を any 以外にできないのか？
    this.dragSub = dragstartEvents$.subscribe((event:any) => {
      console.log('dragstart:', event);
      console.log('dragstart:', event['srcElement']);
      // For Test
      this.overlayRef.overlayElement.classList.add('moving');
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData('text/plain', 'dragging');
      let instance: DragOverlayComponent = componentRef.instance;
      event.dataTransfer.setDragImage(overlayPane, instance.layerX, instance.layerY);

      this.startX = event.pageX;
      this.startY = event.pageY; 
      const dragoverSub = dragoverEvents$.subscribe((event:any) => {
        // console.log('dragover:', event);
        /*
        let offsetX = this.offsetX + event.pageX - this.startX;
        let offsetY = this.offsetY + event.pageY - this.startY;
        console.log('x:', offsetX);
        console.log('y:', offsetY);
        this.positionStrategy.withOffsetX(offsetX);
        this.positionStrategy.withOffsetY(offsetY);
        this.overlayRef.updatePosition();
        */
        event.preventDefault();
      });
      const dropSub = dropEvents$.take(1).subscribe((event:any) => {
        console.log('drop:', event);
        this.offsetX = this.offsetX + event.pageX - this.startX;
        this.offsetY = this.offsetY + event.pageY - this.startY;
        console.log('x:', this.offsetX);
        console.log('y:', this.offsetY);
        this.positionStrategy.withOffsetX(this.offsetX);
        this.positionStrategy.withOffsetY(this.offsetY);
        this.overlayRef.updatePosition();
        // For Test
        this.overlayRef.overlayElement.classList.remove('moving');
        // unsubscribe で解放する
        dragoverSub.unsubscribe();
        event.preventDefault();
      });
    });
  }
  ngOnDestroy() {
    this.dragSub.unsubscribe();
  }
}

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent {
  private _layerX: number;
  private _layerY: number;
  @Output()
  get layerX(): number {
    return this._layerX;
  }
  @Output()
  get layerY(): number {
    return this._layerY;
  }
  click() {
    console.log('click');
  }
  mousedown(event) {
    console.log('mousedown', event);
    this._layerX = event['layerX'];
    this._layerY = event['layerY'];
  }
}
