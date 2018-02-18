import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-fade-in',
  templateUrl: './fade-in.component.html',
  styleUrls: ['./fade-in.component.scss']
})
export class FadeInComponent implements OnInit {
  @ViewChild(CdkPortal) templatePortal: CdkPortal;
  @ViewChild('fadeInParent') fadeInParent: ElementRef;
  private overlayConfig: OverlayConfig;

  constructor(private overlay: Overlay) {
  }

  ngOnInit() {
    const positionStrategy = this.overlay.position().connectedTo(this.fadeInParent, {
      originX: 'start',
      originY: 'top'
    }, {
      overlayX: 'start',
      overlayY: 'top',
    }).withOffsetX(10).withOffsetY(10);
    this.overlayConfig = new OverlayConfig({
      positionStrategy,
    });
    const overlayRef = this.overlay.create(this.overlayConfig);
    this.templatePortal.attach(overlayRef);
  }

  click(event) {
    console.log('click', event);
    const overlayRef = this.overlay.create(this.overlayConfig);
    this.templatePortal.attach(overlayRef);
  }
}
