import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, style, animate, query, stagger } from '@angular/animations';
import { CdkPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';

interface PoiItem {
  name: string;
}

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
    ]),
    trigger('staggerItems', [
      transition('0 => *', [
        query(':enter', [
          style({
            transform: 'translateX(-100%)'
          }),
          stagger(200, animate(500, style({
            transform: 'translateX(0)'
          })))
        ])
      ])
    ]),
    trigger('newItem', [
      transition(':enter', [
        style({
          transform: 'translateY(-50%)'
        }),
        animate('0.2s ease-in')
      ])
    ])
  ]
})
export class FadeInComponent implements OnInit {
  @ViewChild(CdkPortal) templatePortal: CdkPortal;
  @ViewChild('fadeInParent') fadeInParent: ElementRef;
  items: PoiItem[] = [];
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
    // this.templatePortal.attach(overlayRef);
  }

  show(event) {
    console.log('show', event);
    if (!this.templatePortal.isAttached) {
      const overlayRef = this.overlay.create(this.overlayConfig);
      this.templatePortal.attach(overlayRef);
      this.items = [
        { name: 'John Titor' },
        { name: 'Mori' },
        { name: 'Alice' }
      ];
    }
  }
  hide(event) {
    console.log('hide', event);
    if (this.templatePortal.isAttached) {
      this.templatePortal.detach();
      this.items = [];
    }
  }
  add(event) {
    console.log('add', event);
    if (this.templatePortal.isAttached) {
      this.items.push({ name: 'Yuta' });
    }
  }
}