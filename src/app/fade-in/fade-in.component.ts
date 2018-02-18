import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { CdkPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-fade-in',
  templateUrl: './fade-in.component.html',
  styleUrls: ['./fade-in.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ])
    ])
  ]
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
    if (!this.templatePortal.isAttached) {
      const overlayRef = this.overlay.create(this.overlayConfig);
      this.templatePortal.attach(overlayRef);
    }
  }
}
