import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrls: ['./drag-overlay.component.scss']
})
export class DragOverlayComponent implements OnInit {

  @ViewChild(CdkPortal) templatePortal: CdkPortal;

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

  ngOnInit() {
    const positionStrategy =
      this.overlay.position().global().centerHorizontally().centerVertically();
    const config = new OverlayConfig({
      positionStrategy,
    });
    const overlayRef = this.overlay.create(config);
    this.templatePortal.attach(overlayRef);
  }
}
