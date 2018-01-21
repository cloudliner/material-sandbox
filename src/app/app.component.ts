import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CdkPortal } from '@angular/cdk/portal';
import { MyFirstPanelComponent } from './my-first-panel/my-first-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  @ViewChild(CdkPortal) templatePortal: CdkPortal;

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

  ngOnInit() {
    /*
    {
      const positionStrategy =
        this.overlay.position().global().centerHorizontally().centerVertically();
      const config = new OverlayConfig({
        positionStrategy,
        hasBackdrop: true
      });
      const overlayRef = this.overlay.create(config);
      this.templatePortal.attach(overlayRef);
    }
    */
    {
      const targetElementRef = 
        new ElementRef(this.elementRef.nativeElement.querySelectorAll('.targetElement')[0]);
      console.log(targetElementRef);
      const positionStrategy = 
        this.overlay.position().connectedTo(targetElementRef, {
          originX: 'start',
          originY: 'bottom'
        }, {
          overlayX: 'start',
          overlayY: 'bottom'
        }).withOffsetY(20);
        const config = new OverlayConfig({
          positionStrategy
        });
      const overlayRef = this.overlay.create(config);
      const componentPortal = new ComponentPortal<MyFirstPanelComponent>(MyFirstPanelComponent);
      let conponent = componentPortal.component;
      conponent['overlayRef'] = overlayRef;
      conponent['componentPortal'] = componentPortal;
      overlayRef.attach(componentPortal);
    }
  }
}
