import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { DragOverlayComponent, OverlayComponent } from './drag-overlay.component';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule
  ],
  declarations: [
    OverlayComponent,
    DragOverlayComponent
  ],
  exports: [
    OverlayComponent,
    DragOverlayComponent
  ],
  entryComponents: [DragOverlayComponent]
})
export class DragOverlayModule { }
