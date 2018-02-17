import { Component, OnInit, HostListener } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sample-inner',
  templateUrl: './sample-inner.component.html',
  styleUrls: ['./sample-inner.component.scss']
})
export class SampleInnerComponent implements OnInit {
  isHandsetPortrait: boolean;
  isHandset: boolean;
  isTabletPortrait: boolean;
  isTablet: boolean;
  isWebPortrait: boolean;
  isWeb: boolean;
  width: number;
  height: number;

  @HostListener('window:resize')
  onResize() {
    this.showSize();
  }

  ngOnInit() {
    this.showSize();
  }

  constructor(bo: BreakpointObserver) {
    bo.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe((state: BreakpointState) => {
      this.isHandsetPortrait = state.matches;
    });
    bo.observe([
      Breakpoints.Handset
    ]).subscribe((state: BreakpointState) => {
      this.isHandset = state.matches;
    });
    bo.observe([
      Breakpoints.TabletPortrait
    ]).subscribe((state: BreakpointState) => {
      this.isTabletPortrait = state.matches;
    });
    bo.observe([
      Breakpoints.Tablet
    ]).subscribe((state: BreakpointState) => {
      this.isTablet = state.matches;
    });
    bo.observe([
      Breakpoints.WebPortrait
    ]).subscribe((state: BreakpointState) => {
      this.isWebPortrait = state.matches;
    });
    bo.observe([
      Breakpoints.Web
    ]).subscribe((state: BreakpointState) => {
      this.isWeb = state.matches;
    });
  }

  private showSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
