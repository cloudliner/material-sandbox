import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sample-inner',
  templateUrl: './sample-inner.component.html',
  styleUrls: ['./sample-inner.component.scss']
})
export class SampleInnerComponent implements OnInit {
  isHandset: Observable<BreakpointState>;

  constructor(bm: BreakpointObserver) {
    console.log(bm);
    bm.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('state matches:', state);
      } else {
        console.log('state unmatch:', state);
      }
    });
    this.isHandset = bm.observe(Breakpoints.Handset);
    this.isHandset.subscribe((state:BreakpointState) => {
      console.log('state:', state);
    });
  }

  ngOnInit() {
  }
}
