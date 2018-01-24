import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

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
      });
    this.positionStrategy.withOffsetX(this.offsetX);
    this.positionStrategy.withOffsetY(this.offsetY);
    const config = new OverlayConfig({
      positionStrategy: this.positionStrategy
    });
    this.overlayRef = this.overlay.create(config);
    this.templatePortal.attach(this.overlayRef);

    const buttonElement = document.getElementById('drag-overlay');
    let dragstartEvents$ = Observable.fromEvent(buttonElement, 'dragstart');
    let dragendEvents$ = Observable.fromEvent(buttonElement, 'dragend');
    let dragoverEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    let dropEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    dragstartEvents$.subscribe((event:any) => {
      console.log('dragstart:', event);
      this.startX = event.pageX;
      this.startY = event.pageY;  
    });
    dragendEvents$.subscribe((event:any) => {
      console.log('dragend:', event);
    });
    dragoverEvents$.subscribe((event:any) => {
      console.log('dragover:', event);
      event.preventDefault();
    });
    dropEvents$.subscribe((event:any) => {
      console.log('drop:', event);
      this.offsetX = this.offsetX + event.pageX - this.startX;
      this.offsetY = this.offsetY + event.pageY - this.startY;
      console.log('x:', this.offsetX);
      console.log('y:', this.offsetY);
      this.positionStrategy.withOffsetX(this.offsetX);
      this.positionStrategy.withOffsetY(this.offsetY);
      this.overlayRef.updatePosition();
      event.preventDefault();
    });
  }

  dragstart($event) {
    /*
    console.log('dragstart:', $event);
    this.startX = $event.pageX;
    this.startY = $event.pageY;
    */
  }

  dragenter($event) {
    /*
    console.log('dragenter:', $event);
    */
  }

  dragover($event) {
    /*
    console.log('dragover:', $event);
    */
  }

  dragleave($event) {
    /*
    console.log('dragleave:', $event);
    */
  }

  dragend($event) {
    /*
    console.log('dragend:', $event);
    this.offsetX = this.offsetX + $event.pageX - this.startX;
    this.offsetY = this.offsetY + $event.pageY - this.startY;
    console.log('x:', this.offsetX);
    console.log('y:', this.offsetY);
    this.positionStrategy.withOffsetX(this.offsetX);
    this.positionStrategy.withOffsetY(this.offsetY);
    this.overlayRef.updatePosition();
    */
  }

  drop($event) {
    /*
    console.log('drop:', $event);
    $event.stopPropagation();
    */
  }

  click($event) {
    /*
    console.log('click:', $event);
    */
  }
}
