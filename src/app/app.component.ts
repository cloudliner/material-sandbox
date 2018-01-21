import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  @ViewChild(CdkPortal) templatePortal: CdkPortal;

  constructor(private overlay: Overlay) { }

  ngOnInit() {
    const positionStrategy =
      this.overlay.position().global().centerHorizontally().centerVertically();
    const config = new OverlayConfig({
      positionStrategy
    });
    const overlayRef = this.overlay.create(config);
    this.templatePortal.attach(overlayRef);
  }
}
