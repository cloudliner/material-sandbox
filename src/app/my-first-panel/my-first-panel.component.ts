import { Component } from '@angular/core';

@Component({
  selector: 'app-my-first-panel',
  templateUrl: './my-first-panel.component.html',
  styleUrls: ['./my-first-panel.component.scss']
})
export class MyFirstPanelComponent {

  dragenter($event) {
    console.log('dragenter:', $event);
  }

  dragover($event) {
    console.log('dragover:', $event);
  }

  dragleave($event) {
    console.log('dragleave:', $event);
  }

  dragend($event) {
    console.log('dragend:', $event);
  }

  drop($event) {
    console.log('drop:', $event);
  }

  click($event) {
    console.log('click:', $event);
  }
}
