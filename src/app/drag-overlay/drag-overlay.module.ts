import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { DragOverlayComponent } from './drag-overlay.component';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule
  ],
  declarations: [DragOverlayComponent],
  exports: [DragOverlayComponent],
  entryComponents: [DragOverlayComponent]
})
export class DragOverlayModule { }