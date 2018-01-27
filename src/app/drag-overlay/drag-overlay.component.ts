import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
export class OverlayComponent implements OnInit {
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
      positionStrategy: this.positionStrategy
    });
    this.overlayRef = this.overlay.create(config);
    let portal = new ComponentPortal(DragOverlayComponent);
    this.overlayRef.attach(portal);

    // Drag対象
    const overlayPane = this.overlayRef.overlayElement;

    let dragstartEvents$ = Observable.fromEvent(overlayPane, 'dragstart');
    let dragoverEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    let dropEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    // switchMap 前のイベントをなくなったことにする > 最新のに
    // flatMap 前のイベントを継続
    this.dragSub = dragstartEvents$.subscribe((event:any) => {
      console.log('dragstart:', event);
      this.startX = event.pageX;
      this.startY = event.pageY;  
      const dragoverSub = dragoverEvents$.subscribe((event:any) => {
        console.log('dragover:', event);
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
}
