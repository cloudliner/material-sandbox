import { Component, OnInit, OnDestroy,  ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent implements OnInit, OnDestroy {
  private positionStrategy: ConnectedPositionStrategy;
  private overlayRef: OverlayRef;
  private startX :number;
  private startY :number;
  private offsetX = 100;
  private offsetY = 100;
  private dragSub: Subscription;

  @ViewChild(CdkPortal) templatePortal: CdkPortal;

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

  ngOnInit() {
    // TODO: ? -> host evnet listener?
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

    // TODO: ViewChild で取得できる
    const buttonElement = document.getElementById('drag-overlay');
    let dragstartEvents$ = Observable.fromEvent(buttonElement, 'dragstart');
    let dragoverEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'dragover');
    let dropEvents$ = Observable.fromEvent(targetElementRef.nativeElement, 'drop');

    // switchMap 前のイベントをなくなったことにする > 最新のに
    // flatMap 前のイベントを継続
    this.dragSub = dragstartEvents$.subscribe((event:any) => {
      console.log('dragstart:', event);
      this.startX = event.pageX;
      this.startY = event.pageY;  
      const bbb = dragoverEvents$.subscribe((event:any) => {
        console.log('dragover:', event);
        event.preventDefault();
      });
      const aaa = dropEvents$.take(1).subscribe((event:any) => {
        console.log('drop:', event);
        this.offsetX = this.offsetX + event.pageX - this.startX;
        this.offsetY = this.offsetY + event.pageY - this.startY;
        console.log('x:', this.offsetX);
        console.log('y:', this.offsetY);
        this.positionStrategy.withOffsetX(this.offsetX);
        this.positionStrategy.withOffsetY(this.offsetY);
        this.overlayRef.updatePosition();
        // unsubscribe で解放する
        bbb.unsubscribe();
        event.preventDefault();
      });
    });
  }
  ngOnDestroy() {
    this.dragSub.unsubscribe();
  }
}
