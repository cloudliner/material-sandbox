import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CdkPortal } from '@angular/cdk/portal';
import { MyFirstPanelComponent } from './my-first-panel/my-first-panel.component';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

  ngOnInit() {
    const positionStrategy =
      this.overlay.position().global().centerHorizontally().centerVertically();
    const config = new OverlayConfig({
      positionStrategy
    });
    const overlayRef = this.overlay.create(config);
    let position = overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
    position.top('10');
    const componentPortal = new ComponentPortal<MyFirstPanelComponent>(MyFirstPanelComponent);
    overlayRef.attach(componentPortal);
  }
}
