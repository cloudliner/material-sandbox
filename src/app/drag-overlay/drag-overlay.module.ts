import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';

import { DragOverlayComponent } from './drag-overlay.component';
import { DragHandleComponent } from './drag-handle.component';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    MatButtonModule
  ],
  declarations: [
    DragHandleComponent,
    DragOverlayComponent
  ],
  exports: [
    DragHandleComponent,
    DragOverlayComponent
  ],
  entryComponents: [DragOverlayComponent]
})
export class DragOverlayModule { }
